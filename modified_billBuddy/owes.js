import readlineSync from 'readline-sync';
import Expenses from './expense.js';


function editExpenseStatus(user){
    console.log('As you are the payee, You can only edit the status of expense to under Review');
    let expenseName = readlineSync.question('Name of the expense you want to edit: ')
    let expense = user.owes.find(owe => owe.name === expenseName) || null;
    try{
        if(!expense) throw `${expenseName} not found`
        let payee = expense.payees.find(payee => payee.payeeDetails === user.name);
        console.log(`Current Status: ${payee.status}`);
        let statusChange = readlineSync.question('Status: ');
        if(statusChange !== 'under review') throw 'you can only change to under review';
        payee.status = statusChange;
        console.log('Status has been updated');
    }
    catch(err){
        console.log(err);
    }
}

export default function owes(user){
    let flag = true;

    while(flag){
        let choice = parseInt(readlineSync.question('1. view Expenses\n2. view Total Money you owe to Individual group Members\n3.Edit Status of Expense\n4. Exit Owe\n'));
        switch(choice){
            case 1:
                if(user.owes.length === 0) console.log('you have 0 expenses in owes');
                user.owes.forEach(oweExpense => console.log(oweExpense));
                break;
            case 2:
                let costUserOwe = {};
                user.group.forEach(member => costUserOwe[member] = 0);
                user.owes.forEach(expense => {
                    costUserOwe[expense.payer] += expense.getCostneedToPayByPayee(user.name);
                }
                );
                console.log(costUserOwe);
                break;
            case 3:
                editExpenseStatus(user);
                break;
            case 4:
                flag = false;
                break;
            default:
                console.log('Select the correct option');
        }
    }
    
}