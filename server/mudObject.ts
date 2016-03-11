'use strict';

module mud {

    export enum attFlags {
        isPrimaryKey = 1,
        isNullable = 2,
        isHidden = 4
    }
    
    export enum dataType {
        string,
        number,
        date
    }
    
    export class attSchema {
        public constructor(public name: string, public flags: number, public dataType: dataType) {
            
            
        }
        
        
    }
    
    export class childSchema {
        public constructor() {
            
        }
    }
    
    export abstract class mudObject {
        
        public constructor() {
            
        }
    
        //This is the type of object that we're going to use to determine table to go to, and what object to construct
        abstract tableName(): string;
        
        //This is the name of the DB that supports the item
        abstract databaseName(): string;
        
        //Parent container for the object (Room(parent) that contains a Player(this object)
        abstract parent(): mudObject;
        
        //List of children that are contained within the object (Players(children), Monsters(children), Items(children) that are contained within a room(object))
        abstract children(): mudObject[][];
        
        //This is the unique identifier for the object, the Primary Key in the database
        abstract id(): any;
        
        //TODO: replace with attSchema object
        //The atts that are in the object
        abstract attSchema(): attSchema[];
        
        //TODO: replace with childSchema object
        //The pieces needed to construct/load the children at runtime (object type, child type, parentID, child's parentID att)
        abstract childSchema(): childSchema[];
        
        //Go to the persistent database to load the object
        public load(id: any) {
            //TODO: this is where we load the definition of the object from the persistent database
        }
        
        //Save to the temporary db, if it's persistent then save it to both
        public save(persist?: boolean) {
            //TODO: this is where we save the instance of the object to the db in memory
        }
        
        public create(): mudObject {
            //TODO: create a new instance of the object, save it to the local db, and return it
            return;
        }
        
        public dispose(persist?: boolean) {
            //TODO: take this instance of an object, and remove it from the memory db. If it needs to persist, save it to the disc
        }
        
        public getAtt(attId: number): string {
            return this.atts[attId];
        }
        
        public setAtt(attId: number, attValue: string) {
            this.atts[attId] = attValue;
        }
        
        private _atts: string[];
        
        get atts(): string[] {
            if (!this._atts) {
                this._atts = new Array<string>();
            }
            return this._atts;
        }
        
        private getPKAttName(): string {
            for (var i in this.attSchema) {
                if (this.attSchema[i].flags | attFlags.isPrimaryKey) {
                    return this.attSchema[i].name;
                }
            }
        }
        
        private getPKAttValue(): string {
            for (var i in this.attSchema) {
                if (this.attSchema[i].flags | attFlags.isPrimaryKey) {
                    return this.getAtt(i);
                }
            }
        }
    }
}