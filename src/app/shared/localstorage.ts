export const localStorage ={    

    setItem:(name:string, data:any) => {
        localStorage.setItem(name, JSON.stringify(data));
    },

    getItem: (name:string):any => {
        let data = JSON.parse(localStorage.getItem(name));
        return data;
    },

    removeItem: (name:string)=>{
        localStorage.removeItem(name);
    }
    
}