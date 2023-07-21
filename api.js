var Db = require ("./dboperations");
const dboperations=require("./dboperations")
var Mail =require('./mail')

var express=require ("express");
var bodyParser=require ("body-parser");
var cors=require ("cors");
var app =express();
var router=express.Router();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

router.use((request,response,next)=>{
  console.log('middleware');
  next();
})

router.route('/jobkod').get((request,response)=>{
  dboperations.getJobKod().then(result=>{
    //console.log(result);
    response.json(result);
  })
})

router.route('/subekod').get((request,response)=>{
  dboperations.getSubeKod().then(result=>{
    response.json(result);
  })
})

router.route('/alltriglist').get((request,response)=>{
  dboperations.getTrigList().then(result=>{
    response.json(result);
  })
})

router.route('/personeladi').get((request,response)=>{
  dboperations.getPersonelAdi().then(result=>{
    response.json(result);
  })
})


router.route('/mail').post((request,response)=>{
  dboperations.getMail(request.body.job_kodu,request.body.sube_kodu).then(result=>
  {
    console.log(result);
    response.json(result);

  }).catch(error => {
    console.error(error);
    response.status(500).json({ success: false, message: '  Bir hata oluştu.' });
  });
}),


router.route('/personelekle').post((request,response)=>{
  dboperations.addPersonel(request.body.NtUserName)
  .then(result=>{
   console.log(result)
   response.status(201).json({message:"Kayıt başarılı"})
  })
})


router.route('/personelsil/:id').delete((request,response)=>{
  dboperations.deletePersonel(request.params.id).then(result=>{
    console.log(result)
    response.status(201).json({message:"Kayıt silindi"});
  })
})


router.route('/editmail/:id').post((request,response)=>{
  const id=parseInt(request.params.id);
  const {mail_listesi}=request.body;
  const {yedek}=request.body;

  dboperations.updateMail(id,mail_listesi,yedek)
  .then(result=>{
    console.log(result);
    response.status(200).json({message:'Güncelleme başarılı'});
  })
  .catch(error=>{
    console.log(error);
    response.statusCode(500).json({success:false, message:"Güncellemede hata oluştu"})
  })
})



var port =process.env.PORT || 1000; //localhosta bağlanma portu 
app.listen(port);
console.log("SDSdesktop api çalisiyor " + port);