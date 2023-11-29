import User from "./user.js";
import readlineSync from 'readline-sync';
import createExpense from "./CreateExpense.js";
import groups from "./CreateGroup.js";
import owes  from "./owes.js";

const createUser = () => {
    let registerUserName = readlineSync.question('User Name: ');
    let registerPassword = readlineSync.question('Password: ');
    try{
        if(!registerUserName) throw `---username can't be empty-------`;
        users.forEach(user=>{
            if(user.name === registerUserName) throw '------User Name already Exits.Try different name----';
        })
        if(!registerPassword) throw `---Password can't be empty-------`;
        const user = new User(registerUserName, registerPassword);
        users.push(user);
        console.log('-------Registration successfull-----------');
    }
    catch(err){
        console.log(err);
    }
};

const authenticateUser = (userName, password) => {
    try{
        let user = users.find(user => user.name === userName) || null;
        if(!user) throw `User Not Found. 
        You can Register to create an account`;
        if(user.password !== password) throw 'You entered Wrong Password';
        console.log('-------------Log In Successful!--------------');
        return user;
    }
    catch(err){
        console.log(`----------${err}---------`);
        return false;
    }
};


function editExpense(user, expense){
    console.log('As you are the payer, you have access to change every Detail');
    let flag = true;
    while(flag){
        let property = parseInt(readlineSync.question('Property you want to change:\n1.Name\n2.Date\n3.Cost\n4.Amount Paid equally/unequally\n5.Add Payee\n6.Remove Payee\n7.Exit Edit Expense\n'));
        switch(property){
            case 1:
                let newExpenseName = readlineSync.question('New Expense Name: ');
                if(user.existExpenseName(newExpenseName)) console.log(`${newExpenseName} already exist`);
                else{
                    expense.editExpense('name', newExpenseName);
                }
                
                break;
            case 2:
                let newExpenseDate = readlineSync.question('New Expense Date: ');
                expense.editExpense('date', newExpenseDate);
                break;
            case 3:
                let newExpenseCost = parseFloat(readlineSync.question('New Expense Cost: '));
                expense.editExpense('cost', newExpenseCost);
                if(expense.equally){
                    let individualCost = expense.cost / (expense.payees.length+1);
                    expense.payees.forEach(payee => payee.costToBePaid = individualCost);
                }
                break;
            case 4:
                let isEqually = readlineSync.keyInYN('Equally?(y/n): ');
                if(!isEqually){
                    expense.payees.forEach(payee => {
                        let individualCost = parseFloat(readlineSync.question(`Cost ${payee.payeeDetails} should pay: `));
                        payee.costToBePaid = individualCost;
                    });
                }
                else{
                    let individualCost = expense.cost / (expense.payees.length+1);
                    expense.payees.forEach(payee => {
                        payee.costToBePaid = individualCost;
                    });

                }
                expense.editExpense('equally', isEqually);
                break;
            case 5:
                let payeeName = readlineSync.question('Payee name; ');
                let index = users.findIndex(user => user.name === payeeName);
                try{
                    if(index===-1) throw `There is no user named ${payeeName}`;
                    let payee = user.getGroupMember(payeeName);
                    if(payee){
                        let individualCost = 0;
                        if(!expense.equally){
                            individualCost = parseFloat(readlineSync.question('Individual Cost: '));
                        }
                        else{
                            individualCost = expense.cost/(expense.payees.length + 2);
                            expense.payees.forEach(payee => {
                                payee.costToBePaid = individualCost;
                            });
                            
                        }
                        let status = readlineSync.question('Status(Settled, Under Review, Unsettled): ');
                        expense.addPayee({'payeeDetails' : payee.name,
                                          'costToBePaid': individualCost,
                                          'status': status });
                        payee.addowes(expense);
                    }
                }
                catch(err){
                    console.log(err);
                }
                break;
            case 6:
                let deletePayeeName = readlineSync.question('Payee Name: ');
                let payee = expense.getPayee(deletePayeeName);
                if(payee){
                    expense.deletePayee(payee);
                    if(expense.equally){
                        let individualCost = expense.cost / (expense.payees.length+1);
                        expense.payees.forEach(payee => payee.costToBePaid = individualCost);
                    }
                    let owedUser = users.find(user => user.name === payee.payeeDetails);
                    let owedExpenseIndex = owedUser.owes.findIndex(expense1 => expense1.name === expense.name);
                    owedUser.owes.splice(owedExpenseIndex, 1);
                }
                break;
            case 7:
                flag = false;
                break;
            default:
                console.log('Select the Correct option');
        }
    }
}

function expenses(user){
    let flag=true;
    while(flag){
        let choice = parseInt(readlineSync.question('1. View Expenses\n2. Add Expenses\n3. Edit Expenses\n4. Exit Expenses Menu\n'));
        switch(choice){
            case 1:
                if(user.expenses.length === 0) console.log('You have 0 expenses');
                else{
                    user.expenses.forEach(expense => console.log(expense));
                }
                break;
            case 2:
                createExpense(user,users);
                break;
            case 3:
                let expenseName = readlineSync.question('Expense Name: '); 
                let expense = user.findExpense(expenseName);
                try{
                    if(!expense) throw `Expense ${expenseName} not found`;
                    editExpense(user,expense);
                }
                catch(err){
                    console.log(err);
                }
                break;
            case 4:
                flag=false;
                break;
            default:
                console.log('Select the correct option');
        }
    }
}




let flag = true;
const users = [];

while(flag){
    let choice = parseInt(readlineSync.question('1.LogIn\n2.Register\n3.Exit Application\n'));
    switch(choice){
        case 1:
            console.log('Log In');
            let logInUserName = readlineSync.question('User Name: ');
            let logInPassword = readlineSync.question('Password: ');
            try{
                if(!logInUserName) throw `---username can't be empty-------`
                if(!logInPassword) throw `---Password can't be empty-------`
                let user = authenticateUser(logInUserName, logInPassword);
                let flag1 = true;
                while(flag1){
                    if(user){
                        let reportChoice = parseInt(readlineSync.question('\n\n1. Expenses\n2. Owes\n3. Groups\n4. Log  out\n\n'));
                        switch(reportChoice){
                            case 1:
                                expenses(user);
                                break;
                            case 2:
                                owes(user);
                                break;
                            case 3:
                                groups(user, users);
                                break;
                            case 4:
                                flag1 = false;
                                break;
                            default:
                                console.log('Select the correct option');
                            }
                    }
                    else{
                        break;
                    }
                }
            }
            catch(err){
                console.log(err);
            }
       
            break;
        case 2:
            createUser();
            break;
        case 3:
            flag=false;
            break;
        default:
            console.log('Select the correct option')
    }
}