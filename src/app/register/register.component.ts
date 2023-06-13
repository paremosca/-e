import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PartituraModel } from '../models/partitura.model';
import { TipoInstrumento } from '../models/tipoinstrumento.model';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Usuario: UsuarioModel;
  LOPDAceptada: boolean;

  TipoInstrumentos: TipoInstrumento[];
  TipoPaperPartitura: PartituraModel[];
  ClaveInstrumento: number;
  ClaveTipoPaper:number;

  constructor(private authService:AuthService, private router:Router,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.Usuario = new UsuarioModel();
    this.TipoInstrumentos = new Array<TipoInstrumento>();
    this.TipoPaperPartitura = new Array<PartituraModel>();

    this.LOPDAceptada = false;
    this.TipoInstrumentos.push(new TipoInstrumento(1,"Percusió-Caixa"));
    this.TipoInstrumentos.push(new TipoInstrumento(2,"Percusió-Bombo-Plats"));
    this.TipoInstrumentos.push(new TipoInstrumento(3,"Baix"));
    this.TipoInstrumentos.push(new TipoInstrumento(4,"Trombó"));
    this.TipoInstrumentos.push(new TipoInstrumento(5,"Trompa"));
    this.TipoInstrumentos.push(new TipoInstrumento(6,"Trompeta"));
    this.TipoInstrumentos.push(new TipoInstrumento(7,"Saxo Alt"));
    this.TipoInstrumentos.push(new TipoInstrumento(8,"Saxo Tenor"));
    this.TipoInstrumentos.push(new TipoInstrumento(9,"Clarinet"));
    this.TipoInstrumentos.push(new TipoInstrumento(10,"Flauta"));
    this.TipoInstrumentos.push(new TipoInstrumento(11,"Bombardi"));

    this.TipoPaperPartitura.push(new PartituraModel(1,"1er"))
    this.TipoPaperPartitura.push(new PartituraModel(2,"2on"))
    this.TipoPaperPartitura.push(new PartituraModel(3,"3er"))
    this.TipoPaperPartitura.push(new PartituraModel(4,"Ppal"))

    //this.ClaveInstrumento = 8;
    //this.ClaveTipoPaper = 1;
  }

  mostrarLOPD():void{

    this.LOPDAceptada = false;

    Swal.close();
      Swal.fire({
        allowOutsideClick: false,
        title: 'Accepta la LOPD! (al final)',
        html: this.getLOPD(),
        icon:'success',
        width:800,

      }).then((result=>{
        this.LOPDAceptada = true;
      }))
  }


  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text: "Espera perfa..."
    });
    Swal.showLoading();

    this.authService.register_Angular(this.Usuario)
      .then(response => {
        this.Usuario.uid = response.user.uid;
        this.authService.setUsuario_Angular(this.Usuario).then((resp)=>{
          console.log(resp);
          console.log("esto es el return del set Usuario")
        })


        Swal.close();

        Swal.fire({
          icon: 'success',
          title: 'Ja t\'has registrat!!',
          html: 'T\'has registrat correctament, especial.',
          timer: 40000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()

          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(['/partitures']);
          }
        })

      })
      .catch(error => {
        let authError = error as FirebaseError;
        let errorCode = authError.code;
        let MensajeError = "Error no tratat"

        Swal.close();

        if (errorCode == "auth/email-already-in-use") {
          MensajeError = "El emaill ja està registrat, Inicia Sessió";
        }else{
          MensajeError = "Error no tratat, parlali a Izan i dis-li: " + errorCode;
        }

        Swal.fire({
          icon:'error',
          titleText: "Error creant Usuari",
          text: MensajeError,
          confirmButtonText: 'Okei :('
        });
      });
  }


  getLOPD():string{
    return `TÉRMINOS DE USO Y POLÍTICA DE PRIVACIDAD https://api-sim-68441.web.app.-
    En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se hace constar:
    1. DATOS IDENTIFICATIVOS: El titular del/los dominio/s web es Izan Llopis Martínez (en adelante api-sim-68441.web.app), con C.I.F.: G46172094. Correo electrónico de contacto: izanllopis99@gmail.com
    2. USUARIOS: El acceso y/o uso de este sitio web de api-sim-68441.web.app atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, los presentes términos de uso.
    3. USO DEL SITIO WEB: https://api-sim-68441.web.app proporciona el acceso a artículos, informaciones y datos (en adelante, «los contenidos») propiedad de api-sim-68441.web.app. El USUARIO asume la responsabilidad del uso de la web.
    El USUARIO se compromete a hacer un uso adecuado de los contenidos que api-sim-68441.web.app ofrece a través de su web y con carácter enunciativo pero no limitativo, a no emplearlos para:
    (i) incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público; (ii) difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos; (iii) provocar daños en los sistemas físicos y lógicos de api-sim-68441.web.app, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados; (iv) intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.
    api-sim-68441.web.app se reserva el derecho de retirar todos aquellos comentarios y aportaciones que vulneren el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, que atenten contra la juventud o la infancia, el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación.
    En cualquier caso, api-sim-68441.web.app no será responsable de las opiniones vertidas por los usuarios a través del blog u otras herramientas de participación que puedan crearse, conforme a lo previsto en la normativa de aplicación.
    4. POLÍTICA DE PRIVACIDAD. PROTECCIÓN DE DATOS:
    4.1. Finalidad de los datos recabados y CONSENTIMIENTO al tratamiento.-
    Se informa al USUARIO que, mediante los formularios de registro de la web, se recaban datos, con la exclusiva finalidad de envío de comunicaciones electrónicas, tales como: boletines (newsletters), nuevas entradas (posts), así como otras comunicaciones que api-sim-68441.web.app entiende interesantes para sus USUARIOS. Los campos marcados como de cumplimentación obligatoria, son imprescindibles para realizar la finalidad expresada.
    Únicamente api-sim-68441.web.app tendrá acceso a sus datos, y bajo ningún concepto, estos datos serán cedidos, compartidos, transferidos, ni vendidos a ningún tercero.
    La aceptación de la política de privacidad,  mediante el procedimiento establecido de doble opt-in,  se entenderá a todos los efectos como la prestación de consentimiento inequívoco del USUARIO al tratamiento de los datos de carácter personal en los términos que se exponen en el presente documento, así como a la transferencia internacional de datos que se produce, exclusivamente debido a la ubicación física de las instalaciones de los proveedores de servicios y encargados del tratamiento de datos que se dirán en el punto 4.9.
    4.2. Cumplimiento de la normativa de aplicación.-
    api-sim-68441.web.app cumple con las directrices del Reglamento (UE)  2016/679 General de Protección de Datos (RGPD) y de la Ley Orgánica 3/2018 de 5 de diciembre de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), velando por garantizar un correcto uso y tratamiento de los datos personales del usuario.
    Asimismo, api-sim-68441.web.app informa que da cumplimiento a la Ley 34/2002 de 11 de julio, de Servicios de la Sociedad de la Información y el Comercio Electrónico y le solicitará su consentimiento al USUARIO para el tratamiento de su correo electrónico con fines comerciales en cada momento.
    4.3. Derechos del interesado.-
    Le informamos que los datos suministrados, serán tratados para la finalidad de atender su solicitud y el mantenimiento de la relación que se establezca en los formularios que suscriba.
    Adicionalmente, se tratarán los datos del usuario con la finalidad de remitir comunicaciones comerciales siempre y cuando se haya prestado el consentimiento informado, específico, libre e inequívoco a tal fin.
    Como interesado , está facultado para ejercitar los siguientes derechos que la normativa en materia de protección de datos le reconoce de forma expresa, conforme a lo previsto en la misma:
    – Derecho de ACCESO a sus datos personales
    – Derecho de solicitar la RECTIFICACIÓN de los datos inexactos
    – Derecho de solicitar la SUPRESIÓN de sus datos, cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.
    – En determinadas circunstancias, podrá solicitar la LIMITACIÓN DEL TRATAMIENTO de tus datos, en cuyo caso únicamente los conservaremos para el ejercicio o la defensa de reclamaciones.
    – En determinadas circunstancias y por motivos relacionados con tu situación particular, podrá ejercitar su  derecho de OPOSICIÓN al tratamiento de tus datos. Dejaremos de tratar los datos, salvo por motivos legítimos imperiosos, o el ejercicio o la defensa de posibles reclamaciones.
    – En determinadas circunstancias y por motivos relacionados con tu situación particular, podrá solicitar su derecho a la PORTABILIDAD de los datos. Se trata de un derecho complementario al derecho de acceso, ya que permite obtener los datos que nos ha proporcionado en un formato estructurado, de uso común y de lectura mecánica, pudiendo ser transmitidos de forma directa a otra entidad previa petición del Interesado.
    Podrá ejercer tales derechos,  solicitando por cualquier medio que deje constancia de su envío y de su recepción, expresando claramente su voluntad en tal sentido y, en su caso, acompañando copia del DNI y/o cualquier otra documentación acreditativa de tu identidad, dirigiéndote a la dirección de correo electrónico antes indicada,  o a la dirección postal anteriormente indicada.
    Además, en caso de que considere que se ha vulnerado cualquiera de tus derechos, como interesado, estás facultado para presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), sita en C/ Jorge Juan, 6, 28001-Madrid https://www.aepd.es/ o a través de la sede electrónica de la AEPD: https://sedeagpd.gob.es/sede-electronica-web/.
    4.4. Links
    Como un servicio a nuestros visitantes, nuestro sitio web puede incluir hipervínculos a otros sitios que no son operados o controlados por api-sim-68441.web.app. Por ello api-sim-68441.web.app no garantiza, ni se hace responsable de la licitud, fiabilidad, utilidad, veracidad y actualidad de los contenidos de tales sitios web o de sus prácticas de privacidad. Por favor, antes de proporcionar su información personal a estos sitios web ajenos a api-sim-68441.web.app, tenga en cuenta que sus prácticas de privacidad pueden diferir de las nuestras.
    4.5.  Política de «Cookies»
    Una cookie es un archivo de información que el servidor de este sitio web envía al dispositivo (ordenador, smartphone, tablet, etc.) de quien accede a la página para almacenar y recuperar información sobre la navegación que se efectúa desde dicho equipo.
    api-sim-68441.web.app utiliza diversos tipos de cookies (técnicas, analíticas y sociales) únicamente con la finalidad de mejorar la navegación del usuario en el sitio web, sin ningún tipo de objeto publicitario o similar, para el análisis y elaboración de estadísticas de la navegación que el USUARIO realiza en el sitio web, aí como para compartir los contenidos en redes sociales (Google+, Twitter, Linkedin, Disqus)
    api-sim-68441.web.app utiliza en este sitio web las cookies que se detallan a continuación:
    Cookies técnicas: Son aquéllas que permiten al USUARIO la navegación a través de la página web y la utilización de las diferentes opciones o servicios que en ella existen como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de vídeos o sonido o compartir contenidos a través de redes sociales.
    Cookies de Google Analytics: Son cookies de terceros (Google Inc.) de análisis que permiten el seguimiento y análisis del comportamiento de los USUARIOS de los sitios web a los que están vinculadas. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma y para la elaboración de perfiles de navegación de los USUARIOS de dichos sitios, aplicaciones y plataformas, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los USUARIOS del servicio.
    Google Analytics, almacena las cookies en servidores ubicados en Estados Unidos y se compromete a no compartirla con terceros, excepto en los casos en los que sea necesario para el funcionamiento del sistema o cuando la ley obligue a tal efecto. Según Google no guarda la dirección IP del USUARIO.
     Más información sobre Google Analytics en los siguientes enlaces:
    www.google.com/analytics/ y http://www.google.com/intl/es/policies/privacy/
    Si deseas información sobre el uso que Google da a las cookies adjuntamos este otro enlace: https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es&csw=1).
    Cookies sociales: Google+, Facebook, YouTube, Twitter,  etc.: cookies  de terceros, es decir, redes sociales externas y de terceros, cuya temporalidad y finalidad  depende de cada red social.
    El usuario podrá -en cualquier momento- elegir qué cookies quiere que funcionen en este sitio web mediante:
    – La configuración del navegador; por ejemplo:
    Chrome, desde: http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647
    Explorer, desde: http://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9
    Firefox, desde: http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we
    Safari, desde: http://support.apple.com/kb/ph5042
    Opera, desde: http://help.opera.com/Windows/11.50/es-ES/cookies.html
    – Existen herramientas de terceros, disponibles on line, que permiten a los usuarios detectar las cookies en cada sitio web que visita y gestionar su desactivación.
    Ni esta web, ni sus representantes legales se hacen responsables ni del contenido ni de la veracidad de las políticas de privacidad que puedan tener los terceros mencionados en esta política de cookies.
    Los navegadores web son las herramientas encargadas de almacenar las cookies y desde esos navegadores debes efectuar tu derecho a eliminación o desactivación de las mismas. Ni esta web ni sus representantes legales pueden garantizar la correcta o incorrecta manipulación de las cookies por parte de los mencionados navegadores.
    En algunos casos es necesario instalar cookies para que el navegador no olvide tu decisión de no aceptación de las mismas.
     La aceptación de la presente política de privacidad implica que el usuario ha sido informado de una forma clara y completa sobre el uso de dispositivos de almacenamiento y recuperación de datos (cookies) así como que api-sim-68441.web.app dispone del consentimiento del usuario para el uso de las mismas tal y como establece el artículo 22 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE).
    Para cualquier duda o consulta acerca de esta política de cookies no dudes en comunicarte con nosotros a través de la dirección de correo electrónico sim.beniganim@gmail.com
    4.7. Menores de edad
    La web de api-sim-68441.web.app no se dirige a menores de edad. El titular de la web declina cualquier responsabilidad por el incumplimiento de este requisito.
    4.8. Modificación de la Política de Privacidad
    api-sim-68441.web.app se reserva el derecho a modificar su Política de Privacidad, de acuerdo a su propio criterio, motivado por un cambio legislativo, jurisprudencial o doctrinal de la Agencia Española de Protección de Datos.
    Cualquier modificación de la Política de Privacidad será publicada al menos diez días antes de su efectiva aplicación. El uso de la Web después de dichos cambios, implicará la aceptación de los mismos.
    4.9. Responsable del fichero, y encargados del tratamiento.-
    El responsable del tratamiento es Izan Llopis Martínez.
    Se ha exigido a dichos encargados de tratamiento el cumplimiento de las disposiciones normativas de aplicación en materia de protección de datos, en el momento de su contratación.
    5. PROPIEDAD INTELECTUAL E INDUSTRIAL: api-sim-68441.web.app por sí o como cesionario, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de api-sim-68441.web.app o bien de sus licenciantes. Todos los derechos reservados.
    Cualquier uso no autorizado previamente por api-sim-68441.web.app, será considerado un incumplimiento grave de los derechos de propiedad intelectual o industrial del autor.
    Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de api-sim-68441.web.app.
    El USUARIO se compromete a respetar los derechos de Propiedad Intelectual e Industrial titularidad de api-sim-68441.web.app. Podrá visualizar los elementos de la web e incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su uso personal y privado. El USUARIO deberá abstenerse de suprimir, alterar, eludir o manipular cualquier dispositivo de protección o sistema de seguridad que estuviera instalado en las páginas de api-sim-68441.web.app.
    6. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD: api-sim-68441.web.app no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: por errores u omisiones en los contenidos, por falta de disponibilidad del sitio web – el cual realizará paradas periódicas por mantenimientos técnicos – así como por la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
    7. MODIFICACIONES: api-sim-68441.web.app se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su web.
    8. POLÍTICA DE ENLACES:
    8.1. Las personas o entidades que pretendan realizar o realicen un hiperenlace desde una página web de otro portal de Internet a la web de api-sim-68441.web.app deberá someterse  las siguientes condiciones:
    – No se permite la reproducción total o parcial de ninguno de los servicios ni contenidos del sitio web sin la previa autorización expresa de api-sim-68441.web.app
    – No se establecerán deep-links ni enlaces IMG o de imagen, ni frames con la web de api-sim-68441.web.app sin su previa autorización expresa.
    – No se establecerá ninguna manifestación falsa, inexacta o incorrecta sobre la web de api-sim-68441.web.app, ni sobre los servicios o contenidos de la misma. Salvo aquellos signos que formen parte del hipervínculo, la página web en la que  se establezca no contendrá ninguna marca, nombre comercial, rótulo de establecimiento, denominación, logotipo, eslogan u otros signos distintivos pertenecientes a api-sim-68441.web.app, salvo autorización expresa de éste.
    – El establecimiento del hipervínculo no implicará la existencia de relaciones entre api-sim-68441.web.app y el titular de la página web o del portal desde el cual se realice, ni el conocimiento y aceptación de api-sim-68441.web.app de los servicios y contenidos ofrecidos en dicha página web o portal.
    – api-sim-68441.web.app no será responsable de los contenidos o servicios puestos a disposición del público en la página web o portal desde el cual se realice el hipervínculo, ni de las informaciones y manifestaciones incluidas en los mismos.
    8.2. El sitio web de api-sim-68441.web.app puede poner a disposición del usuario conexiones y enlaces a otros sitios web gestionados y controlados por terceros. Dichos enlaces tienen como exclusiva función, la de facilitar a los usuarios la búsqueda de información, contenidos y servicios en Internet, sin que en ningún caso pueda considerarse una sugerencia, recomendación o invitación para la visita de los mismos.
    api-sim-68441.web.app no comercializa, ni dirige, ni controla previamente, ni hace propios los contenidos, servicios, informaciones y manifestaciones disponibles en dichos sitios web.
    api-sim-68441.web.app no asume ningún tipo de responsabilidad, ni siquiera de forma indirecta o subsidiaria, por los daños y perjuicios de toda clase que pudieran derivarse del acceso, mantenimiento, uso, calidad, licitud, fiabilidad y utilidad de los contenidos, informaciones, comunicaciones, opiniones, manifestaciones, productos y servicios existentes u ofrecidos en los sitios web no gestionados por api-sim-68441.web.app
    9. DERECHO DE EXCLUSIÓN: api-sim-68441.web.app se reserva el derecho a denegar o retirar el acceso al portal y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.
    10. GENERALIDADES: api-sim-68441.web.app perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su web ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.
    11. MODIFICACIÓN DE LAS PRESENTES CONDICIONES Y DURACIÓN: api-sim-68441.web.app podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente publicadas como aquí aparecen. La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta que sean modificadas por otras debidamente publicadas.
    12. LEGISLACIÓN APLICABLE : La relación entre api-sim-68441.web.app y el USUARIO se regirá por la normativa española vigente.

    `
  }

}
