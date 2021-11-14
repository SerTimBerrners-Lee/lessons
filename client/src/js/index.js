const imgArr = ['bmp', 'gif', 'jpg', 'png', 'pds', 'tif', 'odg', 'jpeg', 'eps', 'pict', 'pcx', 'ico', 'webp']
const moviArr = ['mp4', 'webm', 'ogv']


export function checkType (input){
  if(!input) 
    return 0;
    
  let typeFile = input.split('.')[input.split('.').length - 1].toLowerCase();
  let type;
  for(let imgType of imgArr) {
    if(typeFile == imgType)
      type = 'img'
  }
  for(let movi of moviArr) {
    if(movi == typeFile)
      type = 'movi'
  }

  return type
} 
