#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
  string names[] = {"Isaac", "Laura", "Elise"};
  for (string name : names)
  {
    cout << name << endl;
  }

  string food = "Pizza";
  string &meal = food;

  cout << &food << endl;
  cout << meal << endl;

  string *ptr = &food;
  cout << ptr << endl;
  cout << *ptr << endl;
}