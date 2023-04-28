function LoginTable() {
  this.test_id = ["test1", "test2", "test3"];
  this.test_password = ["test1", "test2", "test3"];
  this.test_nickname = ["test1", "test2", "test3"];
  this.test_birthday = ["2023-04-24", "2023-04-25", "2023-04-26"];

  this.test_login_id = "test1";

  this.addData = (id, pw, name, date) => {
    this.test_id.push(id);
    this.test_password.push(pw);
    this.test_nickname.push(name);
    this.test_birthday.push(date);
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

  this.getNickname = (id) => {
    return this.test_nickname[this.test_id.indexOf(id)];
  };

  this.getBirthday = (id) => {
    return this.test_birthday[this.test_id.indexOf(id)];
  };

  this.checkId = (id) => {
    return this.test_id.indexOf(id) === -1 ? false : true;
  };
}

function FriendsTable() {
  this.myId = ["test1", "test1", "test2", "test3"];
  this.yourId = ["test2", "test3", "test1", "test1"];

  this.getFriendsList = (loginId) => {
    const result = [];

    for (let i = 4; i < 100; i++) {
      this.myId.push(loginId);
      this.yourId.push(`test${i}`);
    }

    this.myId.forEach((id, index) => {
      if (id === loginId && result.indexOf(this.yourId[index]) === -1)
        result.push(this.yourId[index]);
    });

    return result;
  };

  this.isFriends = (loginId) => {
    const result = [];

    // for (let i = 4; i < 100; i++) {
    //   this.myId.push(`test${i}`);
    //   this.yourId.push(loginId);
    // }

    this.yourId.forEach((id, index) => {
      if (id === loginId)
        result.push({
          id: this.myId[index],
          nickname: loginTableTest.getNickname(this.myId[index]),
        });
    });

    return result;
  };
}

function ChatsData(id, text, datetime) {
  this.id = id;
  this.text = text;
  this.datetime = datetime;
}

function ChatTable() {
  this.chatList = new Array();

  this.chatList.push(new ChatsData("test2", "おはよう", "2023-04-25 17:19:52"));
  // this.chatList.push(new Chat("test1", "test2", "こんにちは", "2023-04-25 17:20:14"));
  this.chatList.push(
    new ChatsData("test3", "こんばんは", "2023-04-25 17:20:55")
  );
  this.chatList.push(
    new ChatsData("test1", "いただきます", "2023-04-25 17:21:17")
  );
  this.getList = () => {
    return this.chatList;
  };
}

export const loginTableTest = new LoginTable();
export const friendsTableTest = new FriendsTable();
export const chatTableTest = new ChatTable();
