let currentUrl = ''
let currentBody='';
let self;
let hasErrors = false;
/**
 * @author eugenio.filho
 * with this class I can inject (import) a object overriding axios object
 * to simulate a backend calls.
 * 
 * I used "fluent interface" or "method chaining" pattern to compose a function mock ecxatly 
 * in the same format then we have on axios.
 * 
 * for exemple, is possible to call mockObj.post(params).then(function).catch(function);
 * 
 */
class MockBackEnd{
    constructor(){
        
        this.post.bind(this);
        this.then.bind(this);
        this.catch.bind(this);
        self = this;
    }

    uniqueNumber(){
        return new Date().getTime();
    }

    post(url, body){
        currentUrl = url;
        currentBody = body;
        return this;
    }

    then(handler){
        handler(self.getResponse());
        return this;
    }

    catch(handler){
        
        if(hasErrors){
            handler('Mock for errors handler');
        }
        return this;
    }

    getResponse(){
        if(currentUrl.indexOf('/storeimage.php')!==-1){
        
            return {data:
                    {image:'/img/img-'+self.uniqueNumber()+'.png'}
                };

        }

        if(currentUrl.indexOf('/proxy.php')!==-1){
        
            return {data:
                    {
                        "updateKey": "UPDATE-634015200-6364006020834041857",
                        "updateUrl": "https://www.linkedin.com/updates?discuss=&scope=634015200&stype=M&topic=6364006020834041857&type=U&a=6wWW"
                    }
                };
        }

        
        if(currentUrl.indexOf('/api.php?entity=memes&id=')!==-1){
        
            currentBody.id = currentUrl.split('id=')[1];
            if(currentBody.id===''){
                currentBody.id=self.uniqueNumber();
            }
            return {data:currentBody};
        }

        
        return {data:[]};
    }
}

export default new MockBackEnd();