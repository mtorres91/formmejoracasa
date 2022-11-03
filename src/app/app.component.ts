import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from './utils/validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare let gtag: Function;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  private apiurl='/api/filter';
  private apiurl1='/api/envio';
  private apiurl3='https://murmuring-river-91123.herokuapp.com/api/envio';
  

  emailid = '';


  title = 'formof';

  email= "";
  name  = "";
  message = "";
  endpoint = "";



  public show_dialog : boolean = true;
  public show_dialog2 : boolean = false;
  public show_dialog3 : boolean = false;

  public show_dialog1 : boolean = false;
  public show_dialogfelicidades : boolean = false;



options: Array<any> = [
    { name: 'Si', value: 'Si' },
    { name: 'No', value: 'No' }
];

optionscasa: Array<any> = [
    { name: 'Soy propietario', value: 'Soy propietario' },
    { name: 'Rento', value: 'Rento' }
];

optionslive: Array<any> = [
  { name: 'Área metropolitana de la Ciudad de México', value: 'CDMX' },
  { name: 'Área metropolitana de Guadalajara', value: 'GDL' },
  { name: 'Otro', value: 'OTRO' }
];



  formof: FormGroup = new FormGroup({
    prestamo: new FormControl(''),
    ingreso: new FormControl(''),
    gastos: new FormControl(''),
    propietario: new FormControl(''),
    ubicacion: new FormControl(''),
    atrasos: new FormControl(''),
    motivo: new FormControl(''),
    consejo: new FormControl('')
  });


  formofdatos: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl('')
  });


  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });


  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    

  }

  private createHeaders() {
    // let headers = HttpHeaders;
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*'
    })
  }


  enviocorreo(){
    var CORREO="";
     if(this.formof.value.ubicacion === "GDL"){
      var CORREO="From:OF<teatendemos@oportunidadfinanzas.com.mx>";
     }
     if(this.formof.value.ubicacion === "CDMX"){
      var CORREO="From:OF<teatendemos@oportunidadfinanzas.com.mx>";
     }


    let params ={
      email:CORREO,
      asunto:"Nueva Solicitud Mejora Casa",
      mensaje:("<p style='font-weight:bold;'>Has recibido una nueva solicitud Mejora Casa "+this.formof.value.ubicacion+"</p></p> <p style='font-weight:bold;'>Nombre</p>"+this.formofdatos.value.nombre+"</p><p style='font-weight:bold;'>Telefono Celular</p>"+this.formofdatos.value.celular+"</p> <p style='font-weight:bold;'>Email</p>"+this.formofdatos.value.email+"</p><p style='font-weight:bold;'>Monto</p>"+this.formof.value.prestamo+"</p><p style='font-weight:bold;'>Ingresos Negocio</p>"+this.formof.value.ingreso+
      " <p style='font-weight:bold;'>Gastos Familiares</p>"+this.formof.value.gastos+" <p style='font-weight:bold;'>Atrasos en otro Prestamo</p>"+this.formof.value.atrasos+" <p style='font-weight:bold;'>Motivo del préstamo</p>"+this.formof.value.motivo+" <p style='font-weight:bold;'>Dispuesto a recibir algunos consejos</p>"+this.formof.value.consejo)
    }
    ///let headers = new HttpHeaders({
    //  'Access-Control-Allow-Origin' : '*'
    //})
    console.log(params);
    console.log("mandado correo");
    this.http.post(this.apiurl3, params).subscribe(resp=>{
      console.log(resp);
    })
  }

  envioc(){
    let user ={
      name:this.formofdatos.value.nombre,
      email:this.formofdatos.value.email
    }
    console.log(user);
    console.log("sendmail");
    this.http.post('https://proxy.cors.sh/https://teal-pasca-e08b7d.netlify.app/sendmail',user).subscribe(
      resp=>{
        console.log("entro");
      console.log(resp);
    })




  }






  ngOnInit(): void {

    this.email = "m@gmail.com";
    this.name = "Hayden Pierce";
    this.message = "Hello, this is Hayden.";

    //Start php via the built in server: $ php -S localhost:8000
    this.endpoint = "./utils/enviar.php";

    //formof//
    this.formof = this.formBuilder.group(
      {
        prestamo: ['', [Validators.required,Validators.max(80000), Validators.min(50000)]],
        ingreso: ['', Validators.required],
        gastos: ['', Validators.required],
        propietario: ['', [Validators.required]],
        ubicacion: ['', [Validators.required]],
        atrasos: ['', [Validators.required]],
        motivo: ['', [Validators.required]],
        consejo: ['', [Validators.required]]
      }
    );

    //formofdatos//



    this.formofdatos = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        celular: ['',[ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        email: ['', [Validators.required, Validators.email]]
      }
    );


    ///ejemplo//
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get fom(): { [key: string]: AbstractControl } {
    return this.formof.controls;
  }
  get fomdatos(): { [key: string]: AbstractControl } {
    return this.formofdatos.controls;
  }


  
  changemayor(event: any) {
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    

    if(event.value === "Si"){


      btn?.removeAttribute('disabled');
      btn?.setAttribute('style', 'opacity:1;');
      if(this.formof.value.propietario==="Rento"){
        btn?.setAttribute('disabled', '');
        //btn?.setAttribute('style', 'background-color: red;');
        btn?.setAttribute('style', 'opacity:0.2;');
          
        }
        if(this.formof.value.ubicacion==="OTRO"){
          btn?.setAttribute('disabled', '');
          //btn?.setAttribute('style', 'background-color: red;');
          btn?.setAttribute('style', 'opacity:0.2;');
            
          }
    }
    if(event.value === "No"){

      btn?.setAttribute('disabled', '');
      //btn?.setAttribute('style', 'background-color: red;');
      btn?.setAttribute('style', 'opacity:0.2;');
      
    }
    console.log(event.value);
  }

  changepropietario(event: any) {
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    if(event.value === "Soy propietario"){
        btn?.removeAttribute('disabled');
        btn?.setAttribute('style', 'opacity:1;');
      if(this.formof.value.mayor==="NO"){
      btn?.setAttribute('disabled', '');
      //btn?.setAttribute('style', 'background-color: red;');
      btn?.setAttribute('style', 'opacity:0.2;');
        
      }
      if(this.formof.value.ubicacion==="OTRO"){
        btn?.setAttribute('disabled', '');
        //btn?.setAttribute('style', 'background-color: red;');
        btn?.setAttribute('style', 'opacity:0.2;');
          
        }
      
    }
    if(event.value === "Rento"){

      btn?.setAttribute('disabled', '');
      //btn?.setAttribute('style', 'background-color: red;');
      btn?.setAttribute('style', 'opacity:0.2;');
      
    }
    console.log(event.value);
  }

  changeubicacion(event: any) {
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    

    if(event.value === "GDL" || event.value === "CDMX"){

      btn?.removeAttribute('disabled');
      btn?.setAttribute('style', 'opacity:1;');
      if(this.formof.value.mayor==="No"){
        btn?.setAttribute('disabled', '');
        //btn?.setAttribute('style', 'background-color: red;');
        btn?.setAttribute('style', 'opacity:0.2;');
          
        }
        if(this.formof.value.propietario==="Rento"){
          btn?.setAttribute('disabled', '');
          //btn?.setAttribute('style', 'background-color: red;');
          btn?.setAttribute('style', 'opacity:0.2;');
            
          }
    }
    if(event.value === "OTRO"){

      btn?.setAttribute('disabled', '');
      //btn?.setAttribute('style', 'background-color: red;');
      btn?.setAttribute('style', 'opacity:0.2;');
      
    }
    console.log(event.value);

  }

  changeatrasos(event: any) {
    console.log(event.value);
    this.emailid = event.emailid;
  }

  
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }



  onSubmit2(): void {
    this.submitted = true;

    if (this.formof.invalid) {

      return;
    }
    this.show_dialog = !this.show_dialog;
    this.show_dialog2 = !this.show_dialog2;


    var firstRow = Number((<HTMLInputElement> document.getElementById("ing")).value);
    var Row =Number( (<HTMLInputElement> document.getElementById("gas")).value);
    var loanAmount =Number( (<HTMLInputElement> document.getElementById("pre")).value);
    var atr = this.formof.get('atrasos')?.value;

    var zona = this.formof.get('ubicacion')?.value;

    var suma = firstRow-Row;


  
  /*
  
  
  const calculatedPayment = PMT(Tas,term,(-loanAmount),0,0);

  // Check for NAN (bad term, etc)
  const cpNotNaN = isNaN(calculatedPayment) ? 0 : calculatedPayment;

  // Convert to 2 Decimal Places
  const cpConverted = (Math.round(cpNotNaN * 100) / 100).toFixed(2);

  // Add Commas to Number
  const payment = cpConverted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  console.log("pago a 12 meses: "+payment);


  const calculatedPayment24 = PMT(Tas,term24,(-loanAmount),0,0);
  

  // Check for NAN (bad term, etc)
  const cpNotNaN24 = isNaN(calculatedPayment24) ? 0 : calculatedPayment24;

  // Convert to 2 Decimal Places
  const cpConverted24 = (Math.round(cpNotNaN24 * 100) / 100).toFixed(2);

  // Add Commas to Number
  const payment24 = cpConverted24.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  console.log("pago a 24 meses: "+payment24);
  */
const el2boton = <HTMLInputElement> document.getElementById("solcalificado");

const wgdlpre = <HTMLInputElement> document.getElementById("wgdlpre");
const wcdmxpre = <HTMLInputElement> document.getElementById("wcdmxpre");

const wgdl = <HTMLInputElement> document.getElementById("wgdl");
const wcdmx = <HTMLInputElement> document.getElementById("wcdmx");

    if(suma<8000 || atr == 'Si'){

      this.show_dialog1 = !this.show_dialog1;
      el2boton.style.display='none';

      //no precalificado, mostrar botones formulario
      if(zona == 'GDL'){
        wgdl.style.display='block';
      }
      if(zona == 'CDMX'){
        wcdmx.style.display='block';
      }
      
      

    console.log("pedir mas informes");
    }else{
      this.show_dialogfelicidades = !this.show_dialogfelicidades;
      
      el2boton.style.display='block';
      console.log("calificado");
      if(zona == 'GDL'){
        wgdlpre.style.display='block';
      }
      if(zona == 'CDMX'){
        wcdmxpre.style.display='block';
      }
      
    }
    const el = <HTMLInputElement> document.getElementById("i");
    el.style.display='none';

    const el2 = <HTMLInputElement> document.getElementById("m2");
    el2.style.display='block';
    var loanAmount =Number( (<HTMLInputElement> document.getElementById("pre")).value);

    const air     = .6; // Annual Interest Rate
    const iva     = .16; // Initial Value Added Tax
    var term=12;
    var term24=24;
  
  
    var Tas = (.050*1.16);
  
    // calculate Payment OF
    if(loanAmount<=80000){
      Tas=(.050*1.16);
    } 
  
  
    const elementm = <HTMLInputElement> document.getElementById("id0");
    const paymentmount = loanAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    elementm.innerHTML = "Simulacion para un crédito de $"+paymentmount;
  
  
    const calculatedPayment= ((loanAmount*Tas)/(1-Math.pow((1+Tas),-term)));
    const cpConverted = (Math.round(calculatedPayment * 100) / 100).toFixed(2);
    const payment = cpConverted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log("pago a 12 meses: "+payment);
    const element = <HTMLInputElement> document.getElementById("id01");
    element.innerHTML = "Pago Mensual: $"+payment+" a 12 meses";
  
    const calculatedPayment24= ((loanAmount*Tas)/(1-Math.pow((1+Tas),-term24)));
    const cpConverted24 = (Math.round(calculatedPayment24 * 100) / 100).toFixed(2);
    const payment24 = cpConverted24.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log("pago a 24 meses: "+payment24);
    const element24 = <HTMLInputElement> document.getElementById("id02");
    element24.innerHTML = "Pago Mensual: $"+payment24+" a 24 meses";
    this.submitted = true;

    console.log(suma);
    console.log(JSON.stringify(this.formof.value, null, 2));

  }

  onSubmit2datos(): void {



    const el = <HTMLInputElement> document.getElementById("m2");
    el.style.display='none';

    const el2 = <HTMLInputElement> document.getElementById("m3");
    el2.style.display='block';
    

    if (this.formofdatos.invalid) {
      return;
    }

    this.show_dialog2 = !this.show_dialog2;
    this.show_dialog3 = !this.show_dialog3;

  //  this.http.get(this.apiurl).subscribe(resp=>{
   // console.log(resp);
  //})

  
    this.enviocorreo();
    //this.sendEmail();
    console.log(JSON.stringify(this.formofdatos.value, null, 2));
  }


  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


  

  sendEmail(){
    let postVars = {
      email : this.email,
      name : this.name,
      message : this.message
    };

    //You may also want to check the response. But again, let's keep it simple.
    this.http.post(this.endpoint, postVars)
        .subscribe(
            response => console.log(response),
            response => console.log(response)
        )
  }

}




export class CardSubtitleExample {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}



