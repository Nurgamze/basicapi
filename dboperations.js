var config = require('./dbconfig');
const sql = require('mssql');


async function getJobKod(){
    try{
        let pool=await sql.connect(config);
        let alldata=await pool.request().query("select distinct job_kodu from SdsDataWH..trig_mail_liste order by job_kodu");
        const data={data:alldata.recordset}
        return data;
    }
    catch(error){
        console.log("Hata mesajı ",error);
    }
}
async function getSubeKod(){
    try{
        let pool=await sql.connect(config);
        let alldata=await pool.request().query("select distinct sube_kodu from SdsDataWH..trig_mail_liste where job_kodu='j030' order by sube_kodu");
        const data={data:alldata.recordset}
        return data;
    }
    catch(error){
        console.log("Hata mesajı ",error);
    }
}

async function getTrigList(){
    try{
        let pool=await sql.connect(config);
        let alldata=await pool.request().query("select * from trig_mail_liste");
        const data={data:alldata.recordset}
        return data;
    }
    catch(error){
        console.log("Hata mesajı ",error);
    }
}

async function getPersonelAdi(){
    try{
        let pool=await sql.connect(config);
        let alldata=await pool.request().query("select * from view_Personel_Choose");
        const data={data:alldata.recordset}
        return data;
    }
    catch(error){
        console.log("Hata mesajı ",error);
    }
}

async function addPersonel(NtUserName){
    try{
        let pool=await sql.connect(config);
        let personelEkle=await pool.request()
        .input('NtUserName',sql.NVarChar,NtUserName)
        .query("INSERT INTO view_Personel_Choose (NtUserName) values (@NtUserName) ")
        return personelEkle.recordset;
    }catch(error){
        console.log(error)
    }
}
async function deletePersonel(id){
    try{
        let pool=await sql.connect(config);
        let deletepers=await pool.request()
        .input("id",sql.Int,id)
        .query("Delete from view_Personel_Choose where id=@id")
        return deletepers.recordset;
    }catch(error){
        console.log(error)
    }
}



async function getMail(job_kodu,sube_kodu){
    try{
        let pool=await sql.connect(config);
        let result = await pool.request()
            .input('job_kodu', sql.VarChar(50), job_kodu)
            .input('sube_kodu', sql.VarChar(50), sube_kodu)
            .query("select id,trig_adi, mail_listesi,yedek from SdsDataWH..trig_mail_liste where job_kodu=@job_kodu and sube_kodu=@sube_kodu");
        const data={data:result.recordset}
        return data;
    }
    catch(error){
        console.log("Hata mesajı ",error);
    }
}


async function updateMail(id,mail_listesi,yedek){
    try{
        let pool=await sql.connect(config);
        let updatemail=await pool.request()
        .input("id",sql.Int,id)
        .input("mail_listesi",sql.NVarChar,mail_listesi)
        .input("yedek",sql.NVarChar,yedek)
        .query("UPDATE trig_mail_liste SET mail_listesi=@mail_listesi,yedek=@yedek WHERE id=@id")
        return updatemail.recordset;
    }
    catch(error){
        console.log(error)
    }
 }
    




module.exports={
    getJobKod:getJobKod,
    getSubeKod:getSubeKod,
    getMail:getMail,
    getTrigList:getTrigList,
    updateMail,updateMail,
    getPersonelAdi,getPersonelAdi,
    addPersonel,addPersonel,
    deletePersonel,deletePersonel,
}