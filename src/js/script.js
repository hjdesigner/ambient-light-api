const apiOld = 'ondevicelight' in window;
const apiNew = 'AmbientLightSensor' in window;
const support = document.querySelector('[data-js="support"]');
const body = document.querySelector('body');

function lightLevel(level){
    console.log(level);
    if(level <= 1){
        body.classList.add('ambient-true');
    }else{
        body.classList.remove('ambient-true');
    }
}

if (!apiOld && !apiNew) {
    support.innerHTML = 'Seu navegador não suporta';
}else if(apiOld){
    support.innerHTML = 'Seu navegador suporta';
    window.addEventListener('devicelight', function(event){
        lightLevel(event.value);
    })
}else{
    support.innerHTML = 'Seu navegador suporta';
    var sensor = new AmbientLightSensor();
    sensor.start();
    sensor.addEventListener('change', function(event) {
        lightLevel(sensor.illuminance);
    });
}