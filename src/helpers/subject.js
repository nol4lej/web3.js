export class Subject { // Sujeto
    // El constructor es un método especial que se llama automáticamente cuando se crea una nueva instancia de una clase. Es utilizado para inicializar el estado y las propiedades de la instancia.
    constructor(){
        // grupo de observadores
        this.observers = []
    }

    // subscripcion a Subject cuando para que un observador esté al tanto en los cambios de estado
    subscribe(obj){
        this.observers.push(obj)
    }

    // eliminar subscripcion, se elimina el observador
    unsuscribe(obj){
        this.observers = this.observers.filter(e => e != obj)
    }

    // notificar cuando cambie el estado a los subscriptores
    notify(model){
        this.observers.forEach(observer => {
            observer.notify(model)
        })
    }
}