window.addEventListener("DOMContentLoaded", function () {
    this.document.getElementById("find-me").addEventListener("click",geoFindMe);
    this.document.getElementById("shareBtn").addEventListener("click",share);
})

function geoFindMe(){
    if('getlocation' in navigator){
        document.getElementById("status").innerHTML = "locating...";
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else{
        document.getElementById("status").innerHTML = "browser does not support geolocation";
    }
}

var mapsLink;
var title;
var iframeLink;

function success(){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
    title = `Latitude: ${latitude}, Longitude: ${longitude}`;
    iframeLink = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
    document.getElementById("map-link").innerHTML = mapsLink;
    document.getElementById("map-link").textContent = title;
    document.getElementById("iframe").src = iframeLink;
    document.getElementById("iframe").classList.remove("d-none");
    document.getElementById("status").innerHTML = "success";
}

function error(){
    document.getElementById("status").innerHTML = "error receiving location";
}

function share(){
    if("share" in navigator){
        const data = {
            title: "my Geo Location",
            text: title,
            url: mapsLink,
        }
        navigator.share(data);
    }
    else{
        document.getElementById("status").innerHTML = "browser does not support sharing";
    }
}