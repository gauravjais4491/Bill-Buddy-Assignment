export default class User{
    #password;
    constructor(name, password){
        this.name = name;
        this.#password = password;
        this.expenses = [];
        this.group= [];
        this.owes= [];
    }

    get password(){
        return this.#password;
    }

    authentication(username,password)
    {
        return (this.name===username && this.#password===password);
    }

    addexpense(expense)
    {
        this.expenses.push(expense);
    }

    addGroupMember(groupMember)
    {
        this.group.push(groupMember);
    }

    getGroupMember(memberName){
        let index = this.group.findIndex(member => member.name === memberName);
        try{
            if(index === -1) throw 'User not in your group, First Add user to your group'
            return this.group[index];
        }
        catch(err){
            console.log(err);
            return false;
        }
        
    }

    addowes(owes)
    {
        this.owes.push(owes);
    }

    findExpense(expenseName){
        return this.expenses.find(expense => expense.name === expenseName) || null;
    }

    existGroupMember(name){
        return this.group.find(groupMember => groupMember.name === name) || null;
    }

    existExpenseName(expenseName){
        return this.expenses.find(expense => expense.name === expenseName) || null;
    }

    toString(){
        return this.name;
    }

}