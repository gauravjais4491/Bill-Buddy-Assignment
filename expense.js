export default class Expenses{
    constructor(name, date, cost, payer,equally){
        this.name = name;
        this.date = date;
        this.cost = cost;
        this.payer = payer;
        this.equally=equally;
        this.payees = [];
    }

    addPayee(payee){
        this.payees.push(payee);
    }

    deletePayee(deletePayee){
        let index = this.payees.findIndex(payee => payee.payeeDetails === deletePayee.payeeDetails);
        this.payees.splice(index, 1);
        console.log(`Payee ${deletePayee.payeeDetails} is deleted`);
    }

    getCostneedToPayByPayee(payeeName){
        let costObject = this.payees.find(payee => payee.payeeDetails === payeeName) || null;
        if(!costObject) return 0
        return costObject.costToBePaid;
    }

    editExpense(property, value){
        this[property] = value;
        console.log(`Changed ${property} to ${value}`);
    }

    existpayee(payeeName){
        return this.payees.find(payee => payee.payeeDetails === payeeName) || null;
    }
    
    getPayee(payeeName){
        let payee = this.payees.find(payee => payee.payeeDetails === payeeName) || null;
        try{
            if(!payee) throw `${payeeName} not found in payee's list`;
            return payee;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
}