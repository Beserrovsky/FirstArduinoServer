#define redPin 7
#define greenPin 6
#define bluePin 5
#define buzzerPin 10

void setup() {
  pinMode(redPin,OUTPUT);
  pinMode(greenPin,OUTPUT);
  pinMode(bluePin,OUTPUT);
  pinMode(buzzerPin,OUTPUT);
  Serial.begin(9600);
  while(!Serial){
    ;
  }
  Serial.println("Arduino pronto!");
  apitar(2);
}

void loop() {
  if(Serial.available()){
    int c = Serial.read();
    if(c!=10){
    Serial.print("Comando: ");
    Serial.println(c,DEC);
    Serial.println(c,BIN);
    switch (c){
      case 98: //b
        apitar(1);
      break;
      case 118: //v
        rgb(255,000,000);
        Serial.println("Led goes red hehe :)");
      break;
      case 97: //a
        rgb(000,000,255);
        Serial.println("Led goes blue hehe :)");
      break;
      case 108: //l
        rgb(255,255,255);
        Serial.println("Led Ligada");
      break;
      case 100: //d
        rgb(000,000,000);
        Serial.println("Led desligada");
      break;
      default:
        Serial.println("Comando não encontrado!");
      break;
      }
    }
    }
}

void apitar(int vezes){
  for(int i= 0; i<vezes ; i++){
    digitalWrite(buzzerPin, HIGH);
    delay(100);
    digitalWrite(buzzerPin, LOW);
    delay(100);
    }
  Serial.println("Beep Beep");
}

void rgb(int r, int g, int b){
  digitalWrite(redPin, r);
  digitalWrite(greenPin, g);
  digitalWrite(bluePin, b);
  }
