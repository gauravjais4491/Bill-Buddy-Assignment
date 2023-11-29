import Expenses from "./expense.js";
import readlineSync from 'readline-sync';
import groups from "./CreateGroup.js";

export default function createExpense(user,users){
    try{
        let expensename = readlineSync.question('Expense name: ');
        if(!user.existExpenseName(expensename)){
            let date = readlineSync.question('Date: ');
            let cost = 0
            do{
                cost = parseFloat(readlineSync.question('Cost: '));
                console.log('Enter a Number not string');
            }while(isNaN(cost))
            let equally = readlineSync.keyInYN('Do you want to divide the bill equally?(y/n): ');
            let expense = new Expenses(expensename,date,cost,user.name,equally);
            let noOfMembers = 0
            do{
                noOfMembers = parseInt(readlineSync.question('The Number of Members: '));
                console.log('Enter a number,not a string')
            }while(isNaN(noOfMembers))
            for(let i = 1; i<noOfMembers;i++){
                let memberName = readlineSync.question('User Name you want to include in to expense: ');
                let payeeExists = expense.existpayee(memberName);
                if(!payeeExists){
                    if(memberName === user.name) console.log(`You can't add yourself to payees list`);
                    let payee = user.getGroupMember(memberName);
                    let individualCost = 0;
                    let status = 'unsettled';
                    if(payee){
                        if(!equally) {
                            individualCost = parseFloat(readlineSync.question(`Cost ${memberName} should    pay:   `));
                        }
                        else{
                            individualCost = cost / noOfMembers;
                            if(!individualCost) throw 'Division By zero. Please enter number of members';
                        }
                        status = readlineSync.question('Status(Settled, Under Review, Unsettled): ');
                        expense.addPayee({'payeeDetails' : payee.name,
                                'costToBePaid': individualCost,
                                'status': status });
                        payee.addowes(expense);
                        console.log(`Expense for ${payee.name} added successfully`);
                    }
                    else{
                        groups(user,users);
                        i -= 1;
                    }
                }
                else{
                    console.log(`${memberName} is already in the payee's list`);
                }
            
        }
        user.addexpense(expense);
    }
    else{
        console.log(`${expensename} already Exists`);
    }
    }
    catch(err){
        console.log(err);
    }
    
}
