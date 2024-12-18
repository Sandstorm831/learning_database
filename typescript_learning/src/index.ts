interface Userd{
    id: string;
    name: string;
    age: string;
    email: string;
    password: string;
}

type updateUserdProps = Pick<Userd, 'id' | 'email'>;
type updateUserdPropsOptional = Partial<updateUserdProps>;

const displayProfile = (updatedProps: updateUserdProps) => {
    // displays profile with updated props
}

// constants on internal value
type deft = {
    readonly name: string, 
    readonly age: number,
}

const defeter: deft = {
    name: "Rohan",
    age: 434
}

// defeter.age = 3  ===> Gives an error as this is readonly
// can also be done by, 
const dfs: Readonly<Userd> = {
    name: "dfmb",
    id: "sd",
    age: "2",
    email: "sdfas@gmail.com",
    password: "sdfwsdsbaidfbd",
}  // This also works, create the object dfs as readonly now you can't change the internal


// Create objects in typescript
type damnUsers = Record<string, number>
// above code create object damnUsers with key of type string and value of type number

type dptyp = 'click' | 'scroll' | 'mousemove';
type excludeDtyp = Exclude<dptyp, 'scroll' > // ====> excluding scroll string from dptyp

