'use strict';
var mud;
(function (mud) {
    (function (attFlags) {
        attFlags[attFlags["isPrimaryKey"] = 1] = "isPrimaryKey";
        attFlags[attFlags["isNullable"] = 2] = "isNullable";
        attFlags[attFlags["isHidden"] = 4] = "isHidden";
    })(mud.attFlags || (mud.attFlags = {}));
    var attFlags = mud.attFlags;
    (function (dataType) {
        dataType[dataType["string"] = 0] = "string";
        dataType[dataType["number"] = 1] = "number";
        dataType[dataType["date"] = 2] = "date";
    })(mud.dataType || (mud.dataType = {}));
    var dataType = mud.dataType;
    class attSchema {
        constructor(name, flags, dataType) {
            this.name = name;
            this.flags = flags;
            this.dataType = dataType;
        }
    }
    mud.attSchema = attSchema;
    class childSchema {
        constructor() {
        }
    }
    mud.childSchema = childSchema;
    class mudObject {
        constructor() {
        }
        //Go to the persistent database to load the object
        load(id) {
            //TODO: this is where we load the definition of the object from the persistent database
        }
        //Save to the temporary db, if it's persistent then save it to both
        save(persist) {
            //TODO: this is where we save the instance of the object to the db in memory
        }
        create() {
            //TODO: create a new instance of the object, save it to the local db, and return it
            return;
        }
        dispose(persist) {
            //TODO: take this instance of an object, and remove it from the memory db. If it needs to persist, save it to the disc
        }
        getAtt(attId) {
            return this.atts[attId];
        }
        setAtt(attId, attValue) {
            this.atts[attId] = attValue;
        }
        get atts() {
            if (!this._atts) {
                this._atts = new Array();
            }
            return this._atts;
        }
        getPKAttName() {
            for (var i in this.attSchema) {
                if (this.attSchema[i].flags | attFlags.isPrimaryKey) {
                    return this.attSchema[i].name;
                }
            }
        }
        getPKAttValue() {
            for (var i in this.attSchema) {
                if (this.attSchema[i].flags | attFlags.isPrimaryKey) {
                    return this.getAtt(i);
                }
            }
        }
    }
    mud.mudObject = mudObject;
})(mud || (mud = {}));
