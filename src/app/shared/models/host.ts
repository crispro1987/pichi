export class HostsModel {
    id_host?: number;
    type_host: string;
    email_host: string;
    password_host: string;
    dni_host: string;  
    token_host?: string;
    codePass_host?: string;
    name_host: string;
    fantasy_host: string;
    phone_host: string;
    address_host: string;
    bank_host?: Array<{ nameBank:string; typeAccount:string; numberAccount:string }>=[];
    date_created_host: string;

    constructor(){
        this.type_host = '',
        this.email_host = '',
        this.password_host = '',
        this.dni_host = '',
        this.name_host = '',
        this.fantasy_host = '',
        this.phone_host = '',
        this.address_host = '',
        this.bank_host = [],
        this.date_created_host = ''
    }
}