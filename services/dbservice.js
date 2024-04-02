import * as SQLite from 'expo-sqlite'
import { SHA256 } from 'crypto-js';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbcarlinhos.db');
    return cx;
}

export async function executeSqlQuery(query) {
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
}

export async function executeSqlQueryWithParams(query, params) {
    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, params,
                (tx, resultado) => {
                    console.log("Linhas afetadas: ", resultado.rowsAffected);
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    });
}

export async function executeSelectSqlQuery(query, params) {
    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, params,
                (tx, registros) => {
                    resolve(registros);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export async function dropTable(tableName) {
    let query = `DROP TABLE IF EXISTS ${tableName}`
    let dropResult = await executeSqlQuery(query);

    console.log('Drop tabela ', tableName, ': ', dropResult);
}

export async function createUsersTable() {
    // Criação da tabela de usuários
    const queryTbUsers = `CREATE TABLE IF NOT EXISTS tbusers
        (
            id integer not null primary key autoincrement,
            name text not null,
            email text not null,
            password text not null,
            role text not null          
        )`;

    return await executeSqlQuery(queryTbUsers);
}

export async function createCategoriesTable() {
    // Criação da tabela de categorias
    const queryTbCategories = `CREATE TABLE IF NOT EXISTS tbcategories
    (
        id integer not null primary key autoincrement,
        name text not null
    )`;

    return await executeSqlQuery(queryTbCategories);
}

export async function createProductsTable() {
    // Criação da tabela de produtos
    const queryTbProducts = `CREATE TABLE IF NOT EXISTS tbproducts
        (
            id integer not null primary key autoincrement,
            name text not null,
            stock int not null,
            unit_price real not null,
            category_id integer not null
        )`;

    return await executeSqlQuery(queryTbProducts);
}

/*export async function createPedidosTable() {
    // Criação da tabela de produtos
    const queryTbProductsInCart = `CREATE TABLE IF NOT EXISTS tbpedidos
        (
            id integer not null primary key autoincrement,            
            total_price real not null,
            category_id integer not null
        )`;

    return await executeSqlQuery(queryTbProductsInCart);
}*/

/*export async function createOrdersTable() {
    // Criação de vendas
    const queryTbOrders = `CREATE TABLE IF NOT EXISTS tborders
        (
            id integer not null primary key autoincrement,
            user_id integer not null,
            date_time real not null
        )`;

    return await executeSqlQuery(queryTbOrders);
}*/

export async function createOrderItemsTable() {
    // Criação dos itens de venda
    const queryTbOrderItems = `CREATE TABLE IF NOT EXISTS tborderitems
        (
            id integer not null primary key autoincrement,
            user_name text not null,
            total_price real not null,
            product_names text not null            
        )`;

    return await executeSqlQuery(queryTbOrderItems);
}

export async function createTables() {

    //await dropTable('tborderitems');

    let tbUserOk = await createUsersTable();
    let tbCategoriesOk = await createCategoriesTable();
    let tbProductsOk = await createProductsTable();
    //let tbOrdersOk = await createOrdersTable();
    let tbOrderItemsOk = await createOrderItemsTable();

    console.log('tbUserOk: ', tbUserOk);
    console.log('tbCategoriesOk: ', tbCategoriesOk);
    console.log('tbProductsOk: ', tbProductsOk);
    //console.log('tbOrdersOk: ', tbOrdersOk);
    console.log('tbOrderItemsOk: ', tbOrderItemsOk);

    return tbCategoriesOk && tbProductsOk && /*tbOrdersOk &&*/ tbOrderItemsOk;
};

export async function checkCategoriesMock() {
    let mockedCategories = ["Peças de reposição", "Ferramentas", "Produtos de limpeza e cuidados", "Pneus e rodas", "Eletrônicos"];

    let alreadyRegisteredCategories = await getCategoriesList();

    console.log('Categorias: ', alreadyRegisteredCategories.length);

    for (let n = 0; n < mockedCategories.length; n++) {
        if (alreadyRegisteredCategories.length == 0 || alreadyRegisteredCategories.findIndex((x) => x.name == mockedCategories[n]) == -1) {
            let result = await addCategory(mockedCategories[n]);
            console.log(mockedCategories[n], ": added ", result)
        }
    }
}

export async function checkProductsMock() {
    const mockedProducts = [
        // Peças de Reposição
        { name: "Filtro de ar", stock: 25, unit_price: 45.00, category_id: 1 },
        { name: "Pastilhas de freio", stock: 30, unit_price: 120.00, category_id: 1 },
        { name: "Correia dentada", stock: 15, unit_price: 200.00, category_id: 1 },
        { name: "Velas de ignição", stock: 40, unit_price: 15.00, category_id: 1 },
        { name: "Amortecedores", stock: 20, unit_price: 250.00, category_id: 1 },
        { name: "Bomba de água", stock: 18, unit_price: 180.00, category_id: 1 },
        { name: "Radiador", stock: 10, unit_price: 450.00, category_id: 1 },
        { name: "Sensor de oxigênio", stock: 22, unit_price: 280.00, category_id: 1 },
        { name: "Alternador", stock: 8, unit_price: 350.00, category_id: 1 },
        { name: "Molas de suspensão", stock: 25, unit_price: 300.00, category_id: 1 },
        // Ferramentas
        { name: "Jogo de chaves de fenda e Phillips", stock: 30, unit_price: 50.00, category_id: 2 },
        { name: "Macaco hidráulico", stock: 20, unit_price: 150.00, category_id: 2 },
        { name: "Chave de roda (cruzeta)", stock: 45, unit_price: 40.00, category_id: 2 },
        { name: "Torquímetro", stock: 15, unit_price: 200.00, category_id: 2 },
        { name: "Multímetro automotivo", stock: 22, unit_price: 120.00, category_id: 2 },
        { name: "Extrator de polia", stock: 12, unit_price: 90.00, category_id: 2 },
        { name: "Jogo de soquetes", stock: 35, unit_price: 80.00, category_id: 2 },
        { name: "Prensa hidráulica", stock: 7, unit_price: 700.00, category_id: 2 },
        { name: "Bomba de teste de vazamento de cilindro", stock: 9, unit_price: 300.00, category_id: 2 },
        { name: "Scanner de diagnóstico OBD2", stock: 20, unit_price: 400.00, category_id: 2 },
        // Produtos de Limpeza e Cuidados
        { name: "Shampoo automotivo", stock: 50, unit_price: 30.00, category_id: 3 },
        { name: "Cera de carnaúba", stock: 30, unit_price: 60.00, category_id: 3 },
        { name: "Polidor de metal", stock: 25, unit_price: 45.00, category_id: 3 },
        { name: "Limpa-vidros", stock: 40, unit_price: 20.00, category_id: 3 },
        { name: "Hidratante para couro", stock: 18, unit_price: 75.00, category_id: 3 },
        { name: "Espuma de limpeza de estofados", stock: 15, unit_price: 50.00, category_id: 3 },
        { name: "Revitalizador de plásticos", stock: 22, unit_price: 35.00, category_id: 3 },
        { name: "Desengraxante", stock: 30, unit_price: 25.00, category_id: 3 },
        { name: "Aspirador de pó portátil para carros", stock: 12, unit_price: 110.00, category_id: 3 },
        { name: "Toalhas de microfibra", stock: 38, unit_price: 20.00, category_id: 3 },
        // Pneus e Rodas
        { name: "Pneus all-season", stock: 30, unit_price: 400.00, category_id: 4 },
        { name: "Pneus de performance para verão", stock: 20, unit_price: 500.00, category_id: 4 },
        { name: "Pneus de inverno", stock: 15, unit_price: 450.00, category_id: 4 },
        { name: "Rodas de liga leve", stock: 10, unit_price: 800.00, category_id: 4 },
        { name: "Calotas", stock: 40, unit_price: 50.00, category_id: 4 },
        { name: "Válvulas de pneu", stock: 35, unit_price: 5.00, category_id: 4 },
        { name: "Sensores de pressão de pneu (TPMS)", stock: 20, unit_price: 100.00, category_id: 4 },
        { name: "Espaçadores de roda", stock: 18, unit_price: 150.00, category_id: 4 },
        { name: "Balanceadores de roda", stock: 22, unit_price: 200.00, category_id: 4 },
        { name: "Kits de reparo de pneu", stock: 30, unit_price: 25.00, category_id: 4 },
        // Eletrônicos
        { name: "Câmera de ré", stock: 25, unit_price: 150.00, category_id: 5 },
        { name: "Sistema de navegação GPS", stock: 20, unit_price: 400.00, category_id: 5 },
        { name: "Rádio com Bluetooth", stock: 35, unit_price: 250.00, category_id: 5 },
        { name: "Carregador veicular USB", stock: 50, unit_price: 20.00, category_id: 5 },
        { name: "Alarme veicular", stock: 30, unit_price: 200.00, category_id: 5 },
        { name: "Central multimídia", stock: 15, unit_price: 1200.00, category_id: 5 },
        { name: "Rastreador veicular", stock: 22, unit_price: 300.00, category_id: 5 },
        { name: "Sensores de estacionamento", stock: 25, unit_price: 180.00, category_id: 5 },
        { name: "Faróis de LED", stock: 18, unit_price: 350.00, category_id: 5 },
        { name: "Tela de DVD para encosto de cabeça", stock: 12, unit_price: 500.00, category_id: 5 }
    ];

    let alreadyRegisteredProducts = await getProductsList();

    console.log('Produtos: ', alreadyRegisteredProducts.length);

    for (let n = 0; n < mockedProducts.length; n++) {
        if (alreadyRegisteredProducts.length == 0 || alreadyRegisteredProducts.findIndex((x) => x.name == mockedProducts[n].name) == -1) {
            let result = await addProduct(mockedProducts[n]);
            console.log(mockedProducts[n], ": added ", result)
        }
    }
}

export async function checkMocks() {

    await checkCategoriesMock();
    await checkProductsMock();
    return true;
}

export async function addUser(user) {
    let query = 'insert into tbusers (name, email, password, role) values (?,?,?,?)';
    let params = [user.name, user.email, SHA256(user.password).toString(), user.role];
    return await executeSqlQueryWithParams(query, params);
}

export async function getRegisteredEmail(email) {
    let query = 'select * from tbusers where email = ?';
    let params = [email];
    let registers = await executeSelectSqlQuery(query, params);
    return (registers.rows != undefined && registers.rows.length >= 1);
}

export async function getUserByEmailAndPassword(email, password) {

    let query = 'select * from tbusers where email = ? and password = ?';
    let params = [email, SHA256(password).toString()];
    let registers = await executeSelectSqlQuery(query, params);

    if (registers.rows.length >= 1) {
        let userObj = {
            id: registers.rows.item(0).id,
            name: registers.rows.item(0).name,
            email: registers.rows.item(0).email,
            role: registers.rows.item(0).role
        };

        return userObj;
    }
    else
        return undefined;
}

export async function addCategory(category) {
    let query = 'insert into tbcategories (name) values (?)';
    let params = [category];

    console.log(params);

    return await executeSqlQueryWithParams(query, params);
}

export async function getCategoriesList() {
    let query = 'select * from tbcategories';
    let params = [];
    let registers = await executeSelectSqlQuery(query, params);


    var categoriesList = []

    if (registers.rows != undefined && registers.rows.length >= 1) {
        for (let n = 0; n < registers.rows.length; n++) {
            let obj = {
                id: registers.rows.item(n).id,
                name: registers.rows.item(n).name
            }
            categoriesList.push(obj);
        }
    }

    return categoriesList;
}

export async function addOrder(productsInCart, user, total_price) {
    let product_names = "";    
    let query = 'insert into tborderitems (user_name, total_price, product_names) values (?, ?, ?)';
    for(var i = 0; i < productsInCart.length; i++){
        if(i == productsInCart.length - 1){
            product_names += productsInCart[i]["name"] + ".";
        }
        else{
            product_names += productsInCart[i]["name"] + ", ";
        }
    }
    
    let params = [ user.name,  total_price, product_names];

    console.log(params);

    if(total_price > 0){
        return await executeSqlQueryWithParams(query, params);
    }
}

export async function getOrdersList(userName) {
    let params = userName;
    let query = 'select * from tborderitems where user_name = ' + "'" + params + "'";
    let registers = await executeSelectSqlQuery(query, params);
    console.log("params ",params)

    var ordersList = []

    if (registers.rows != undefined && registers.rows.length >= 1) {
        
        for (let n = 0; n < registers.rows.length; n++) {
            let obj = {
                username: registers.rows.item(n).user_name,                
                productnames: registers.rows.item(n).product_names,
                totalprice: registers.rows.item(n).total_price
            }
            ordersList.push(obj);
        }
    }
    
    return ordersList;//ordersList.sort((a, b) => a.name.localeCompare(b.name));
}

export async function addProduct(product) {
    let query = 'insert into tbproducts (name, stock, unit_price, category_id) values (?, ?, ?, ?)';
    let params = [ product.name, product.stock, product.unit_price, product.category_id ];

    console.log(params);

    return await executeSqlQueryWithParams(query, params);
}

export async function updateProduct(product) {
    let query = 'update tbproducts set name = ?, stock = ?, unit_price = ?, category_id = ? where id = ?';
    let params = [ product.name, product.stock, product.unit_price, product.category_id, product.id ];

    console.log(params);

    return await executeSqlQueryWithParams(query, params);
}

export async function removeProduct(product_id) {
    let query = 'delete from tbproducts where id=?';
    let params = [ product_id ];

    console.log("params ", params);

    return await executeSqlQueryWithParams(query, params);
}

export async function getProductsList() {
    let query = 'select * from tbproducts';
    let params = [];
    let registers = await executeSelectSqlQuery(query, params);

    var productsList = []

    if (registers.rows != undefined && registers.rows.length >= 1) {
        for (let n = 0; n < registers.rows.length; n++) {
            let obj = {
                id: registers.rows.item(n).id,
                name: registers.rows.item(n).name,
                stock: registers.rows.item(n).stock,
                unit_price: registers.rows.item(n).unit_price,
                category_id: registers.rows.item(n).category_id
            }
            productsList.push(obj);
        }
    }

    return productsList.sort((a, b) => a.name.localeCompare(b.name));
}

// export function obtemTodosUsuarios() {

//     return new Promise((resolve, reject) => {

//         let dbCx = getDbConnection();
//         dbCx.transaction(tx => {
//             let query = 'select * from tbUsuarios';
//             tx.executeSql(query, [],
//                 (tx, registros) => {

//                     var retorno = []

//                     for (let n = 0; n < registros.rows.length; n++) {
//                         let obj = {
//                             codigo: registros.rows.item(n).codigo,
//                             nome: registros.rows.item(n).nome,
//                             email: registros.rows.item(n).email,
//                             senha: registros.rows.item(n).senha
//                         }
//                         retorno.push(obj);
//                     }
//                     resolve(retorno);
//                 })
//         },
//             error => {
//                 console.log(error);
//                 resolve([]);
//             }
//         )
//     }
//     );
// }

// export function alteraUsuario(usuario) {

//     return new Promise((resolve, reject) => {
//         let query = 'update tbUsuarios set nome=?, email=?, senha=? where codigo=?';
//         let dbCx = getDbConnection();

//         dbCx.transaction(tx => {
//             tx.executeSql(query, [usuario.nome, usuario.email, usuario.senha, usuario.codigo],
//                 (tx, resultado) => {
//                     resolve(resultado.rowsAffected > 0);
//                 })
//         },
//             error => {
//                 console.log(error);
//                 resolve(false);
//             }
//         )
//     }
//     );
// }

// export function excluiUsuario(codigo) {

//     return new Promise((resolve, reject) => {
//         let query = 'delete from tbUsuarios where codigo=?';
//         let dbCx = getDbConnection();

//         dbCx.transaction(tx => {
//             tx.executeSql(query, [codigo],
//                 (tx, resultado) => {
//                     resolve(resultado.rowsAffected > 0);
//                 })
//         },
//             error => {
//                 console.log(error);
//                 resolve(false);
//             }
//         )
//     }
//     );
// }

// export function excluiTodosUsuarios() {

//     return new Promise((resolve, reject) => {
//         let query = 'delete from tbUsuarios';
//         let dbCx = getDbConnection();
//         dbCx.transaction(tx => {
//             tx.executeSql(query, [],
//                 (tx, resultado) => resolve(resultado.rowsAffected > 0)
//             );
//         },
//             error => {
//                 console.log(error);
//                 resolve(false);
//             }
//         );
//     }
//     );
// }