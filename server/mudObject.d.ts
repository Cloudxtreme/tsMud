declare module mud {
    enum attFlags {
        isPrimaryKey = 1,
        isNullable = 2,
        isHidden = 4,
    }
    enum dataType {
        string = 0,
        number = 1,
        date = 2,
    }
    class attSchema {
        name: string;
        flags: number;
        dataType: dataType;
        constructor(name: string, flags: number, dataType: dataType);
    }
    class childSchema {
        constructor();
    }
    abstract class mudObject {
        constructor();
        abstract tableName(): string;
        abstract databaseName(): string;
        abstract parent(): mudObject;
        abstract children(): mudObject[][];
        abstract id(): any;
        abstract attSchema(): attSchema[];
        abstract childSchema(): childSchema[];
        load(id: any): void;
        save(persist?: boolean): void;
        create(): mudObject;
        dispose(persist?: boolean): void;
        getAtt(attId: number): string;
        setAtt(attId: number, attValue: string): void;
        private _atts;
        atts: string[];
        private getPKAttName();
        private getPKAttValue();
    }
}
