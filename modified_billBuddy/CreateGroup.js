import readlineSync from 'readline-sync';


export default function groups(user, users){
    let flag = true;
    while(flag){
        let choice = parseInt(readlineSync.question('1.View Group\n2.Add members\n3.Remove Member\n4.Exit Group Menu\n'));
        switch(choice){
            case 1:
                if(user.group.length === 0) console.log('You have 0 Members in the group');
                else{
                    user.group.forEach(member => console.log(member));
                }
                break;
            case 2:
                const addMemberName = readlineSync.question('\nMember name: ');
                const checkMemberIsPresent = user.existGroupMember(addMemberName);
                if(!checkMemberIsPresent){
                    const index = users.findIndex(user => user.name === addMemberName);
                    try{
                        if(addMemberName === user.name) throw 'You are already in the group';
                        if(index===-1) throw 'user not found. Check the user name';
                        user.addGroupMember(users[index].name);
                        let friend = users.find(user => user.name === addMemberName);
                        friend.addGroupMember(user.name);
                        console.log(`----------${addMemberName} added to Group
                        You are added to ${addMemberName}'s group--------`);
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                else{
                    console.log(`${addMemberName} already in the group`);
                }
                
                break;
            case 3:
                const deleteMemberName = readlineSync.question('\nMember name: ');
                const index1 = user.group.findIndex(member => member === deleteMemberName);
                try{
                    if(index1 === -1) throw `${deleteMemberName} is not found in the group`;
                    user.group.splice(index1,1);
                    console.log(`${deleteMemberName} is removed from the group`);
                }
                catch(err){
                    console.log(err);
                }
                break;
            case 4:
                flag = false;
                break;
            default:
                console.log('Select the correct option');
        }
    }
}
