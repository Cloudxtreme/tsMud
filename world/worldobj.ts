'use strict';

import sqlite = require('sqlite3');

export interface IworldObject {
    parent: worldObject;
    children: worldObject[];
    id: any;
    attSchema: string[];
    childSchema: string[];
}

export abstract class worldObject {
    
    //This is the type of object that we're going to use to determine table to go to, and what object to construct
    abstract objType(): string;
    
    //Parent container for the object (Room(parent) that contains a Player(this object)
    abstract parent(): worldObject;
    
    //List of children that are contained within the object (Players(children), Monsters(children), Items(children) that are contained within a room(object))
    abstract children(): worldObject[][];
    
    //This is the unique identifier for the object, the Primary Key in the database
    abstract id(): any;
    
    //TODO: replace with attSchema object
    //The atts that are in the object
    abstract attSchema: string[];
    
    //TODO: replace with childSchema object
    //The pieces needed to construct/load the children at runtime (object type, child type, parentID, child's parentID att)
    abstract childSchema: string[];
    
    //Go to the persistent database to load the object
    public load(id: any) {
        //TODO: this is where we load the definition of the object from the persistent database
    }
    
    //Save to the temporary db, if it's persistent then save it to both
    public save(persist?: boolean) {
        //TODO: this is where we save the instance of the object to the db in memory
    }
    
    public create(): worldObject {
        //TODO: create a new instance of the object, save it to the local db, and return it
    }
    
    public dispose(persist?: boolean) {
        //TODO: take this instance of an object, and remove it from the memory db. If it needs to persist, save it to the disc
    }
}