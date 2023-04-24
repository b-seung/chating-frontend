function TestCase() {
  this.test_id = ["test1"];
  this.test_password = ["test1"];
  this.test_nickname = ["test1"];
  this.test_birthday = ["2023-04-24"];

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

export const testcase = new TestCase();
