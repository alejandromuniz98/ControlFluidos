
export default class Singleton{
    static Sing=null;
    UrlBase="https://vision.lsi.uniovi.es/rodicar/api_1_0"

    UrlClientes="/clientes";
    UrlPaises="/paises";
    UrlUsuarios="/usuarios";
    UrlOrdenes="/ordenes";
    UrlAceites="/aceites";
    UrlDepositos="/depositos"
    UrlPistolas="/pistolas"
    UrlTalleres="/talleres"


    static getInstance(){
        if(Singleton.Sing==null){
            Singleton.Sing=new Singleton();
        }
        return this.Sing;
    }

    getUrlClientes(){
        return this.UrlBase+this.UrlClientes;
    }
    getUrlPaises(){
        return this.UrlBase+this.UrlPaises;
    }
    getUrlUsuarios(){
        return this.UrlBase+this.UrlUsuarios;
    }
    getUrlOrdenes(){
        return this.UrlBase+this.UrlOrdenes;
    }
    getUrlAceites(){
        return this.UrlBase+this.UrlAceites;
    }
    getUrlDepositos(){
        return this.UrlBase+this.UrlDepositos;
    }
    getUrlPistolas(){
        return this.UrlBase+this.UrlPistolas;
    }
    getUrlTalleres(){
        return this.UrlBase+this.UrlTalleres;
    }

}