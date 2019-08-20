
class Constants {

    /**
     * SERVER
     */
    // PORT SERVER
    public static readonly PORT:number = 3000;
    /**
     * POSTGRES DATABASE
     */
    // HOST DATABASE TEMPORARY
    public static readonly HOST: string = 'localhost';
    // PORT DATABASE TEMPORARY
    public static readonly PORT_DATABASE: string = '5432';
    // USER DATABASE TEMPORARY
    public static readonly USER_DATABASE: string = 'mario';
    // PASSWORD DATABASE TEMPORARY
    public static readonly PASSWORD_DATABASE: string = 'root';
    // NAME DATABASE
    public static readonly DATABASE: string = 'openbis';

    /**
     * JSON WEB TOKEN
     */
    // SECRET KEY TOKEN
    public static readonly SECRET_KEY: string = 'P_@_R_@_L_E_P_1_P_3_D_0_$$$/D3S0x1Rr1B0nuScl3iC0'
    // EXPIRED TOKEN
    public static readonly EXPIRED_TOKEN: string = 'TokenExpiredError';
    /**
     * Email
     */
    // SUBJECT
    public static readonly SUBJECT: string = 'Recuperación de contraseña';
    // EMAIL
    public static readonly EMAIL: string = 'mariojosueitq@gmail.com';
    // PASSWORD
    public static readonly PASSWORD_EMAIL: string = 'Madarasusano';
    // SERVICE EMAIL
    public static readonly SERVICE_EMAIL: string = 'Gmail';

    /**
     * Routes
     */
    // ROUTE
    public static readonly OPENBIS: string = 'openbis';

}

export default Constants;