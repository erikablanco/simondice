
      const green = document.getElementById('green')
      const red = document.getElementById('red')
      const blue = document.getElementById('blue')
      const yellow = document.getElementById('yellow')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const txtNivel = document.getElementById('txtNivel');
      const seleccion = document.querySelector('.gameboard');
      const ULTIMO_NIVEL = 10  

      const audio = new Howl
({
      "src": [
      "../sounds/audio.mp3",
      "../sounds/audio.webm",
    ],
    "sprite": {
      "A": [
        100,
        1541.2244897959183
      ],
      "B": [
        3000,
        1410.6122448979593
      ],
      "C": [
        6000,
        1488.9795918367347
      ],
      "D": [
        9000,
        1384.489795918368
      ]
    }
});

seleccion.addEventListener('click',() => {
  if(event.target.classList.contains('color'))
  {
    let audioPlay= event.target.dataset.sound;
    audio.play(audioPlay);
  }
})
     

      class Juego {
        constructor() {
            setTimeout(() =>{
                this.inicializar = this.inicializar.bind(this)
              this.inicializar()
              this.generarSecuencia()
              this.siguienteNivel ()

            }, 500)       
                  
        }

        inicializar() {
          this.inicializarContadorNivel();
          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)
          this.toggleBtnEmpezar()
          this.nivel = 1
          
          this.colores = {
              green,
              red,
              blue,
              yellow
            }            
        }

        toggleBtnEmpezar(){
            if (btnEmpezar.classList.contains('hide')) 
            {
             btnEmpezar.classList.remove('hide')
            } else {
                btnEmpezar.classList.add('hide')
            }
        }
        
        generarSecuencia() {
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        }

        siguienteNivel() {
           this.subnivel = 0
           this.iluminarSecuencia()
           this.agregarEventosclick()
           this.actualizarContadorNivel();
        }
        
        transformarNumeroAColor(numero) {
           switch (numero) {
               case 0:
                   return 'green'
                case 1:
                   return 'red'
                case 2:
                   return 'blue'
                case 3:
                   return 'yellow'
           }
        }

        transformarColorANumero(color) {
           switch (color) {
               case 'green':
                   return 0
                case 'red':
                   return 1
                case 'blue':
                   return 2
                case 'yellow':
                   return 3
           }
        }

         transformarColorASonido(color) {
              switch(color) {
                  case 'green':
                      return 'A';

                  case 'red':
                      return 'B';

                   case 'blue':
                       return 'C';

                   case 'yellow':
                        return 'D';
                }
            }

        iluminarSecuencia() {
           for(let i = 0; i < this.nivel; i++) {
             const color = this.transformarNumeroAColor(this.secuencia[i])
             setTimeout(() => this.iluminarColor(color), 1000 * i)
           } 
        }
        
        iluminarColor(color) {
           this.colores[color].classList.add('light')
           this.reproduceSonidoColor(color);
           setTimeout(() => this.apagarColor(color), 350)
        }

        apagarColor(color) {
            this.colores[color].classList.remove('light')
        }

        reproduceSonidoColor(color)
        {
          const SONIDO=this.transformarColorASonido(color);
          audio.play(SONIDO);
        }

        agregarEventosclick() {
            this.colores.green.addEventListener('click', this.elegirColor)
            this.colores.red.addEventListener('click', this.elegirColor)
            this.colores.blue.addEventListener('click', this.elegirColor)
            this.colores.yellow.addEventListener('click', this.elegirColor)
        }

        eliminarEventosClick() {
            this.colores.green.removeEventListener('click', this.elegirColor)
            this.colores.red.removeEventListener('click', this.elegirColor)
            this.colores.blue.removeEventListener('click', this.elegirColor)
            this.colores.yellow.removeEventListener('click', this.elegirColor)

        }

        inicializarContadorNivel() {
            txtNivel.value=`Nivel: 0`;
        }

        actualizarContadorNivel() {
            txtNivel.value=`Nivel: ${this.nivel}`;
        }

        elegirColor(ev){
            const nombreColor = ev.target.dataset.color
            const numeroColor = this.transformarColorANumero(nombreColor)
            this.iluminarColor(nombreColor)
            if (numeroColor === this.secuencia[this.subnivel]) {
               this.subnivel+=1;
               if (this.subnivel === this.nivel) {
                this.nivel+=1;
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                  this.ganoElJuego()
                } else {
                setTimeout(this.siguienteNivel, 1500)
                }

               }
            } else {
                this.perdioElJuego()
            }
        }

        ganoElJuego () {
          swal('Great', 'Felicitaciones, ganaste el juego', 'success')
           .then(this.inicializar)
        }

        perdioElJuego () {
          swal('Ooop!', 'Lo lamentamos, perdiste :(', 'error')
           .then(() => { 
               this.eliminarEventosClick()             
               this.inicializar()
           })
        }

    } 
    
    function empezarJuego() {
        window.juego = new Juego()
      }

      ///function empezarJuego () {
       //    alert('El juego va a comenzar')
      // }