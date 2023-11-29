import Expenses from "./expense.js";

export default class User{
    #password;
    constructor(name, password,expenses,group,owes){
        this.name = name;
        this.#password = password;
        this.expenses = [];
        this.group= [];
        this.owes= [];
        if(expenses.length !== 0) {
            expenses = expenses.map(expense => new Expenses(expense.name, expense.date, expense.cost, expense.payer, expense.equally,expense.payees));
            this.expenses = this.expenses.concat(expenses);
        }

        if(group.length !== 0) this.group = this.group.concat(group);
        if(owes.length !== 0) {
            owes = owes.map(owe => new Expenses(owe.name, owe.date, owe.cost, owe.payer, owe.equally,owe.payees));
            this.owes = this.owes.concat(owes);
        }
    }

    get password(){
        return this.#password;
    }

    authentication(username,password)
    {
        return (this.name===username && this.#password===password);
    }

    getPrivateFieldUserData(){
        let data = {
            "name": this.name,
            "password": this.#password,
            "expenses": this.expenses,
            "group":this.group,
            "owes": this.owes
        };
        return JSON.stringify(data);
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
        let index = this.group.findIndex(member => member === memberName);
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
        return this.group.find(groupMember => groupMember === name) || null;
    }

    existExpenseName(expenseName){
        return this.expenses.find(expense => expense.name === expenseName) || null;
    }

    toString(){
        return this.name;
    }

}