class User {
    constructor(name, surname, email, phoneNumber, password, role,id) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.password = password;
      this.role = role;
      this.id = id;
      // Дополнительные поля
    }
  
    // Методы для получения и установки дополнительных полей
      getName() {
        return this.name;
      }
    
      // Метод для установки имени пользователя
      setName(name) {
        this.name = name;
      }
    
      // Метод для получения фамилии пользователя
      getSurname() {
        return this.surname;
      }
      getRole() {
        return this.role;
      }
      setRole(role){
        this.role=role
      }
    
      // Метод для установки фамилии пользователя
      setSurname(surname) {
        this.surname = surname;
      }

      setId(id) {
        this.id = id;
      }
    
      getId() {
        return this.id;
      }
      getPhone() {
        return this.phoneNumber;
      }
      setPhone(phoneNumber){
        this.phoneNumber=phoneNumber
      }
      
  }
  
  export default User;
  