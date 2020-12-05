window.jQuery=function(selectorOrArray){
    let elements
    if(typeof selectorOrArray ==='string'){
        elements=document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    return{
        find(selector){
            let array = []
            for(let i=0; i<elements.length;i++){
               let elements2 =Array.from(elements[i].querySelectorAll(selector)) 
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
            for(let i=0; i<elements.length;i++){
                fn.call(null,elements[i],i)
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
            console.log(elements);
        },

        oldApi:selectorOrArray.oldApi,
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
}