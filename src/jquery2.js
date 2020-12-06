window.$=window.jQuery=function(selectorOrArray){
    let elements
    if(typeof selectorOrArray ==='string'){
        elements=document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }

    const api = Object.create(jQuery.prototype)// 创建一个对象，这个对象的 __proto__ 为括号里面的东西
    // const api = {__proto__: jQuery.prototype}
    console.log(api);
    // api.oldApi=selectorOrArray.oldApi
    // api.elements=elements
    Object.assign(api, {
        elements: elements, //因为方法不再是在同一个函数里面了，而是封装到了下面，所以elements没有办法用，需要在api里面一个方法elements
        //下面使用elements的时候，this.elements=== api.elements
        oldApi: selectorOrArray.oldApi
      })
    return api
};


jQuery.fn = jQuery.prototype ={
    constructor: jQuery,
    jQuery:true,
    find(selector){
        let array = []
        for(let i=0; i<this.elements.length;i++){
           let elements2 =Array.from(this.elements[i].querySelectorAll(selector)) 
           array=array.concat(elements2)
        }
        array.oldApi=this //给后面的end调用的
        return jQuery(array)
    },

    // addClass(className){
    //     for(let i =0;i<elements.length;i++){
    //         elements[i].classList.add(className)
    //     }
    //     return this
    // },


    each(fn){
        for(let i=0; i<this.elements.length;i++){
            fn.call(null,this.elements[i],i)
        }
        return this
    },

    addClass(className){
        this.each((node)=>{
            node.classList.add(className)
        })
        return this
    },

    parent(){
        let array =[]
        this.each((node)=>{
            if(array.indexOf(node.parentNode) === -1){
                array.push(node.parentNode) 
            }
           
        })
        return jQuery(array)
    },

    children(){
        let array=[]
        this.each((node)=>{
            array.push(...node.children)
        })
        return jQuery(array)
    },

    print(){
        console.log(this.elements);
    },

    
    end(){ //通常用在find后面
        return this.oldApi
    },

    siblings(){
        const array =[]
        this.each((node)=>{
            array.push(...Array.from(node.parentNode.children).filter(n=>n!==node))
        })
        return jQuery(array)
    },

    next(){
        const array=[]
        this.each((node)=>{
            let x = node.nextSibling
            while(x&&x.nodeType===3){
                x=x.nextSibling
            }
            array.push(x)
        })
        return jQuery(array)
    }
}