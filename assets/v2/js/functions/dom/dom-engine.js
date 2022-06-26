export default function isDomEntity(entity) {
    if(typeof entity  === 'object' && entity.nodeType !== undefined){
       return true;
    }
    else{
       return false;
    }
  }
  export default function isExist(node){
    if(!node  === null && node !== undefined && node.nodeType !== undefined && node.nodeName !== undefined && node.nodeValue !== undefined && node.length !== 0){
        return true;
     }
     else{
        return false;
     }
  }
