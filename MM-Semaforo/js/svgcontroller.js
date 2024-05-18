document.addEventListener("DOMContentLoaded", function() {
    begin_svg();
});

function begin_svg(){
    const iframe = document.getElementById('svgIframe');
    iframe.addEventListener('load', function() {
    const svgnode = iframe.contentDocument;
    
        inicializar(svgnode);
       
        comportamiento_2();

    });
}


 
 //Variables
  //Variables
   
   
   /*
   Valores hexadecimales de colores
   
   Rojo: #ff0000
   Amarillo: #ffff00
   Verde: #00ff00
   Gris (Apagado):"#8a9597"
   
   */
   
   // Define los rangos en un array
   var rangos = [
    "0 a 30 s", "30 a 33", "33 a 35", "35 a 45", "45 a 48","48 a 50",
    "50 a 95", "95 a 98", "98 a 100", "100 a 120"
    ];

// Índice actual del rango mostrado
    var indiceActual = 0;

function inicializar(svgnode){
    // Lista de IDs de los elementos SVG a cambiar
    var ids = [
        "SP2V", "SP3V", "SV2A", "SV2R", "SV2V2", "SP1V", 
        "SV1A", "SV1R", "SP4V", "SV3V", "SV3A", "SP5V", 
        "SP6V", "SP7V", "SP8V", "SV4V", "SV4A"
    ];

    // Recorre cada ID y cambia el color
    ids.forEach(function(id) {
        var element = svgnode.getElementById(id);
        if (element) {
            element.style.fill = "#8a9597";
        }
    });
    
    svgnode.getElementById("SV1VP").style.display = "none";
    svgnode.getElementById("SV2V1P").style.display = "none";
    svgnode.getElementById("SV2V2P").style.display = "none";
    svgnode.getElementById("SV4VP").style.display = "none";
    svgnode.getElementById("SV3VP").style.display = "none";
    
    svgnode.getElementById("SP1S").style.display = "none";
    svgnode.getElementById("SP2S").style.display = "none";
    svgnode.getElementById("SP3S").style.display = "none";
    svgnode.getElementById("SP4S").style.display = "none";
    svgnode.getElementById("SP5S").style.display = "none";
    svgnode.getElementById("SP6S").style.display = "none";
    svgnode.getElementById("SP7S").style.display = "none";
    svgnode.getElementById("SP8S").style.display = "none";
    
    svgnode.getElementById("SV1S").style.display = "none";
    svgnode.getElementById("SV2S").style.display = "none";
    svgnode.getElementById("SV3S").style.display = "none";
    svgnode.getElementById("SV4S").style.display = "none";
    
    
    
    
}

 // Función para actualizar el texto del rango
function actualizarRango(svgnode) {
    var rangoElement = svgnode.getElementById("Rango");
    rangoElement.textContent = rangos[indiceActual];
}


function comportamiento_1(svgnode){
    
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SV3R","SP5R","SP6R","SP7R","SP8R","SV4R"];
    var idsverde=["SV2V1","SV1V"];
    var idsgris=["SP2V","SP3V","SP1V","SP4V","SV3V","SV3A","SP5V","SP6V","SP7V",
    "SV4V","SV4A","SV2V2","SV2A","SV2R","SV1A","SV1R"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
     idsverde.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    svgnode.getElementById("SV1VP").style.display = "none";
    svgnode.getElementById("SV1S").style.display = "none";
   
}

function comportamiento_2(svgnode){
    
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SV3R","SP5R","SP6R","SP7R","SP8R","SV4R"];
    var idsverde=["SV2V1"];
    var idsgris=["SP2V","SP3V","SP1V","SP4V","SV3V","SV3A","SP5V","SP6V","SP7V",
    "SV4V","SV4A","SV2V2","SV2A","SV2R","SV1A","SV1R"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
     idsverde.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    
    svgnode.getElementById("SV1VP").style.display = "";
    svgnode.getElementById("SV1S").style.display = "";
     
    
}


function comportamiento_3(svgnode){
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SV3R","SP5R","SP6R","SP7R","SP8R","SV4R"];
    var idsamarillo=["SV1A"];
    var idsgris=["SP2V","SP3V","SP1V","SP4V","SV3V","SV3A","SP5V","SP6V","SP7V",
    "SV4V","SV4A","SV2V2","SV2A","SV2R","SV1R","SV1V"];
    var idsverde=["SV2V1"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
    
     idsverde.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
        
    svgnode.getElementById("SV1VP").style.display = "none";
    svgnode.getElementById("SV1S").style.display = "";
    
    svgnode.getElementById("SP2S").style.display = "none";
    svgnode.getElementById("SV2S").style.display = "none";
}


function comportamiento_4(svgnode){
     var idsrojo=["SP2R","SP3R","SP1R","SP4R","SV3R","SP5R","SP6R","SP7R","SP8R","SV4R","SV1R"];
    //var idsamarillo=["SV1A"];
    var idsgris=["SP3V","SP1V","SP4V","SV3V","SV3A","SP5V","SP6V","SP7V",
    "SV4V","SV4A","SV2A","SV2R","SV1A","SV1V","SP2R","SV1A"];
    var idverdes=["SP2V","SV2V2"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idverdes.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    /*
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
        
    */
    
    svgnode.getElementById("SV2V1P").style.display = "none";
    svgnode.getElementById("SV2V2P").style.display = "none";
    
    
    svgnode.getElementById("SV1S").style.display = "none";
    
    svgnode.getElementById("SP2S").style.display = "";
    svgnode.getElementById("SV2S").style.display = "";
    svgnode.getElementById("SV1S").style.display = "";
    

}



function comportamiento_5(svgnode){
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SV3R","SP5R","SP6R","SP7R","SP8R","SV4R","SV1R"];
    //var idsamarillo=["SV1A"];
    var idsgris=["SP3V","SP1V","SP4V","SV3V","SV3A","SP5V","SP6V","SP7V",
    "SV4V","SV4A","SV2A","SV2R","SV1A","SV1V","SP2R","SV1A"];
    var idverdes=["SP2V","SV2V2"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idverdes.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    /*
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
        
    */
    
    svgnode.getElementById("SV2V1P").style.display = "";
    svgnode.getElementById("SV2V2P").style.display = "";
    svgnode.getElementById("SV2S").style.display = "";
    
    svgnode.getElementById("SP2S").style.display = "none";
    svgnode.getElementById("SV1S").style.display = "none";
    
    
}




function comportamiento_6(svgnode){
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SV3R","SP5R","SP6R","SP7R","SP8R","SV4R","SV1R"];
    var idsamarillo=["SV2A"];
    var idsgris=["SP3V","SP1V","SP4V","SV3V","SV3A","SP5V","SP6V","SP7V",
    "SV4V","SV4A","SV2R","SV1A","SV1V","SP2R","SV1A","SV2V2","SV2V1"];
    var idverdes=["SP2V"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idverdes.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
        
    svgnode.getElementById("SV2V1P").style.display = "none";
    svgnode.getElementById("SV2V2P").style.display = "none";
    
    
    svgnode.getElementById("SV2S").style.display = "";
     
    svgnode.getElementById("SV3S").style.display = "none";
    svgnode.getElementById("SP6S").style.display = "none";
    svgnode.getElementById("SV4S").style.display = "none";
    
     
}


function comportamiento_7(svgnode){
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SP5R","SP7R","SP8R","SV1R","SV2R"];
    //var idsamarillo=["SV2A"];
    var idsgris=["SP3V","SP1V","SP4V","SV3A","SP5V","SP7V",
    "SV4A","SV1A","SV1V","SP2R","SV1A","SV2V2","SV2V1","SV3R","SP6R","SV4R","SV2A"];
    var idverdes=["SP2V","SV3V","SP6V","SV4V"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idverdes.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    /*
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
    */
    
    svgnode.getElementById("SV3VP").style.display = "none";
    svgnode.getElementById("SV4VP").style.display = "none";
    
    svgnode.getElementById("SV2S").style.display = "";
    svgnode.getElementById("SV3S").style.display = "";
    svgnode.getElementById("SP6S").style.display = "";
    svgnode.getElementById("SV4S").style.display = "";
    
    

}
function comportamiento_8(svgnode){
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SP5R","SP7R","SP8R","SV1R","SV2R"];
    //var idsamarillo=["SV2A"];
    var idsgris=["SP3V","SP1V","SP4V","SV3A","SP5V","SP7V",
    "SV4A","SV1A","SV1V","SP2R","SV1A","SV2V2","SV2V1","SV3R","SP6R","SV4R"];
    var idverdes=["SP2V","SV3V","SP6V","SV4V"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idverdes.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    /*
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
    */
    
    svgnode.getElementById("SV3VP").style.display = "";
    svgnode.getElementById("SV4VP").style.display = "";
    
    
     svgnode.getElementById("SV2S").style.display = "none";
    svgnode.getElementById("SP6S").style.display = "none";


    svgnode.getElementById("SV4S").style.display = "";
    svgnode.getElementById("SV3S").style.display = "";
    
    
}
function comportamiento_9(svgnode){
    
    var idsrojo=["SP2R","SP3R","SP1R","SP4R","SP5R","SP7R","SP8R","SV1R"];
    var idsamarillo=["SV3A","SV4A"];
    var idsgris=["SP3V","SP1V","SP4V","SP5V","SP7V","SV4V",
    "SV1A","SV1V","SP2R","SV1A","SV2V2","SV2V1","SV3R","SP6R","SV4R","SV3V","SP6V","SP8V"];
    var idverdes=["SP2V","SP6V"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idverdes.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
    
    
    svgnode.getElementById("SV3VP").style.display = "none";
    svgnode.getElementById("SV4VP").style.display = "none";
    
    svgnode.getElementById("SV4S").style.display = "";
    svgnode.getElementById("SV3S").style.display = "";
    
     svgnode.getElementById("SP3S").style.display = "none";
    svgnode.getElementById("SP1S").style.display = "none";
    svgnode.getElementById("SP4S").style.display = "none";
    svgnode.getElementById("SP5S").style.display = "none";
    svgnode.getElementById("SP7S").style.display = "none";
    svgnode.getElementById("SP8S").style.display = "none";
   
    
    
}
function comportamiento_10(svgnode){
    var idsrojo=["SP2R","SV1R","SV3R","SV2R","SV4R"];
    //var idsamarillo=["SV6A"];
    var idsgris=["SP8R","SP3R","SP1R","SP4R","SV3A","SP7R",
    "SV4A","SV1A","SV1V","SP2R","SV1A","SV2V2","SV2V1","SP6R","SV3V","SP6V","SV2A","SP5R"];
    var idverdes=["SP2V","SP3V","SP1V","SP4V","SP5V","SP7V","SP8V","SP6V"];
    
    idsrojo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ff0000";
    }
        
    });
    
    idsgris.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#8a9597";
    }
        
    });
    
    idverdes.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#00ff00";
    }
        
    });
    
    /*
    idsamarillo.forEach(function(id){
    var element=svgnode.getElementById(id);
    if(element){
        element.style.fill="#ffff00";
    }
        
    });
    */
    svgnode.getElementById("SP3S").style.display = "";
    svgnode.getElementById("SP1S").style.display = "";
    svgnode.getElementById("SP4S").style.display = "";
    svgnode.getElementById("SV3S").style.display = "";
    svgnode.getElementById("SP5S").style.display = "";
    svgnode.getElementById("SP7S").style.display = "";
    svgnode.getElementById("SP8S").style.display = "";
    svgnode.getElementById("SV4S").style.display = "";
    
}







