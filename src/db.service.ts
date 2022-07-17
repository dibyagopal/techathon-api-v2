const mysql = require('mysql2/promise');

class DbService {

    async query<T = any, R = any>(
        functionName: string,
      ): Promise<{ data: T; fields: R }>{
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await this.getConnection();
                const [rows, fields] = await connection.query(functionName);
                connection.end();

                if (rows) {
                    resolve({ data:rows, fields });
                } else {
                    reject({
                        error: 'Data not found',
                    });
                }
            } catch (error) {
                reject({
                    error,
                });
            }
        });
    };

    async getConnection() {
        // const connection = new Client(this.getCredentials());
        // await connection.connect();
        // return connection;

        return await mysql.createConnection({
            host: 'SG-crocus-cook-7607-52693.servers.mongodirector.com',
            database: 'techathonDa',
            user: 'tbdb',
            password: 'i9bf!j8NUqB7M6i',
        });

        //connection.end();
    }

    async checkConnection(): Promise<boolean> {
        try {
            const connection = await this.getConnection();
            connection.end();
            return true;
        } catch (error) {
            return false;
        }
    }
}

export {
    DbService,
}