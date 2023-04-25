function LoginTable() {
  this.test_id = ["test1", "test2", "test3"];
  this.test_password = ["test1", "test2", "test3"];
  this.test_nickname = ["test1", "test2", "test3"];
  this.test_birthday = ["2023-04-24", "2023-04-25", "2023-04-26"];

  this.test_login_id = "";

  this.addData = (id, pw, name, date) => {
    this.test_id.push(id);
    this.test_password.push(pw);
    this.test_nickname.push(name);
    this.test_birthday.push(date);

    console.log(this.test_id);
    console.log(this.test_password);
    console.log(this.test_nickname);
    console.log(this.test_birthday);
  };

  this.setLoginId = (id) => {
    this.test_login_id = id;
  };

  this.getLength = () => {
    return this.test_id.length;
  };

  this.checkId = (id) => {
    if (this.test_id.indexOf(id) !== -1) return true;
    return false;
  };

  this.findUser = (nickname, id, birthday) => {
    let idIndex = this.test_id.indexOf(id);
    let nicknameIndex = this.test_nickname.indexOf(nickname);
    let birthdayIndex = this.test_birthday.indexOf(birthday);

    if (idIndex === -1 || nicknameIndex === -1 || birthdayIndex === -1)
      return false;

    if (
      idIndex !== nicknameIndex ||
      nicknameIndex !== birthdayIndex ||
      birthdayIndex !== idIndex
    )
      return false;

    return true;
  };

  this.resetPassword = (id, password) => {
    this.test_password[this.test_id.indexOf(id)] = password;
  };
}

function FriendsTable() {
  this.myId = ["test1", "test1", "test2", "test3"];
  this.yourId = ["test2", "test3", "test1", "test1"];

  this.getFriendsList = (loginId) => {
    const result = [];

    this.myId.forEach(id, index => {
      if (id === loginId) result.push(this.yourId[index]);
    })

    return result;
  }
}

function ChatsData(id, text, datetime) {
  this.id = id;
  this.text = text;
  this.datetime = datetime;
}

function Chat(id, text, )

function ChatTable() {
  this.chatList = new Array();

  this.chatList.push(new Chat("test1", "test2", "おはよう", "2023-04-25 17:19:52"));
  this.chatList.push(new Chat("test1", "test2", "こんにちは", "2023-04-25 17:20:14"));
  this.chatList.push(new Chat("test1", "test3", "こんばんは", "2023-04-25 17:20:55"));
  this.chatList.push(new Chat("test2", "test1", "いただきます", "2023-04-25 17:21:17"));

  this.getChatList = (loginId) => {
    const chats = new Map();

    this.chatList.forEach(chat=> {
      if (chat.myId === loginId || chat.yourId === loginId) ;
    })

    chats.sort(chat1, chat2 => {return chat2.datetime - char1.datetime});
    return chats;
  }
}

export const loginTableTest = new LoginTable();
export const friendsTableTest = new FriendsTable();
export const chatTableTest = new ChatTable();
