// //polymorphism
// abstract class Payment{
//   amount: number;
//   constructor(amount: number){
//     this.amount=amount;
//   }
//   abstract pay(): void;
// }
// class CreditCardPayment extends Payment{
  
//   constructor(nominal: number, amount: number){
//     super(amount)
//     this.nominal = nominal
//   }
  
//   pay(){
//     console.log(`pembayaran Kartu kredit sebesar Rp. ${this.amount}`)
//   }
//   showAmount(){const fee = (5 * this.amount) / 100;
//   this.nominal = fee;
//   console.log(`Nominal Pembayaran Rp. ${this.nominal}`);
//   }
// }
// class EWalletPayment extends Payment {
//   nominal: number;
//   constructor(nominal: number, amount: number){
//     super(amount)
//     this.nominal = nominal
//   }
//   pay() {
//     const fee = (2 * this.amount) / 100;
//     this.nominal = fee;
//     console.log(`Nominal Pembayaran Rp. ${this.nominal}`);
//     console.log(`pembayaran Ewallet sebesar Rp. ${this.amount}`);
//   }
//   showAmount() {
//     console.log(`Nominal Pembayaran Rp. ${this.amount}`);
//   }
// }
// class BankTransferPayment extends Payment {
//   nominal: number;
//   constructor(nominal: number, amount: number){
//     super(amount)
//     this.nominal = nominal
//   }
//   pay() {
    
//     console.log(`pembayaran melalu transfer bank sebesar ${this.amount}`);
//   }
//   showAmount() {
//     const fee = (1 * this.amount) / 100;
//     this.nominal = fee;
//     console.log(`Nominal Pembayaran Rp. ${this.nominal}`);
//   }
// }
// const payments = [
//   new CreditCardPayment(100000),
//   new EWalletPayment(500000),
//   new BankTransferPayment(400000)
// ]
// payments.forEach((trans) => {
//   trans.pay()
// })

// //child class
// class User {
//   name: string;
//   email: string;
//   constructor(name: string, email: string) {
//     this.name = name;
//     this.email = email;
//   }
//   login() {
//     console.log(`user ${this.name} melakukan login`);
//   }
// }
// class Admin extends User {
//   constructor(name: string, email: string) {
//     super(name, email);
//   }
//   manageUser() {
//     console.log(`Admin bernama ${this.name} login menggunakan email ${this.email}`);
//   }
//   login(){
// console.log('admin login berhasil')
//   }
// }
// class Member extends User{
//   constructor(name: string, email: string){
//     super(name, email)
//   }
//   joinProject(){
//     console.log(`member ${this.name} join di project`)
//   }
//   login(){
//     console.log('member login berhasil')
//   }
// }

// const admin1 = new Admin('Abdul', 'abdul@gmail.com')
// admin1.login();
// admin1.manageUser();
// const member1 = new Member('Budi', 'budi@gmail.com')
// member1.login()
// member1.joinProject()

// //getter dan setter
// class Employee {
//   private _name: string;
//   private _salary: number;

//   constructor(name: string, salary: number) {
//     this._name = name;
//     this._salary = salary;
//   }

//   get name() {
//     return this._name;
//   }
//   get salary() {
//     return this._salary;
//   }
//   set name(value: string) {
//     if (value.trim() === '') {
//       console.log('error');
//       return;
//     }
//     this._name = value;
//   }
//   set salary(value: number) {
//     if (value < 0) {
//       console.log('error');
//       return;
//     }
//     this._salary = value;
//   }
//   introduce() {
//     return 'Halo saya ' + this._name + 'dengan gaji Rp. ' + this._salary;
//   }
//   get annualSalary() {
//     return this._salary * 12;
//   }
// }

// class BankAccount {
//   owner: string;
//   private balance: number;

//   constructor(owner: string, balance: number) {
//     this.owner = owner;
//     this.balance = balance;
//   }
//   checkBalance() {
//     console.log(`Your Name : ${this.owner}`);
//     console.log(`Balance : ${this.balance}`);
//   }
//   deposit(amount: number) {
//     if (amount < 0) {
//       console.log('saldo tidak boleh kurang dari 0');
//       return;
//     }
//     this.balance += amount;
//     console.log(`berhasil deposit. saldo saat ini ${this.balance}`);
//   }
//   withDraw(amount: number) {
//     if (amount > this.balance) {
//       console.log(`Saldo anda kurang. Saldo saat ini ${this.balance}`);
//       return;
//     }
//     this.balance -= amount;
//     console.log(`berhasil tarik tunai sejumlah ${amount}`);
//     console.log(`saldo saat ini ${this.balance}`);
//   }
//   transfer(targetAccount: BankAccount, amount: number) {
//     if (amount > this.balance) {
//       console.log('saldo tidak cukup');
//       return;
//     }
//     this.balance -= amount;
//     targetAccount.balance += amount;
//   }
// }
// const account1 = new BankAccount('Abdul', 1000);
// const account2 = new BankAccount('Rozaq', 300);
// account1.deposit(500);
// account1.withDraw(200);
// account1.checkBalance();
// account1.transfer(account2, 300);
