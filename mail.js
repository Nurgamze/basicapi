class Mail{
    constructor(id,trig_adi,job_kodu,sube_kodu,mail_listesi,tip,yedek,yedek_tarih){
        this.id=id,
        this.trig_adi=trig_adi,
        this.job_kodu=job_kodu,
        this.sube_kodu=sube_kodu,
        this.mail_listesi=mail_listesi,
        this.yedek=yedek,
        this.yedek_tarih=yedek_tarih

    }
}

module.exports=Mail;