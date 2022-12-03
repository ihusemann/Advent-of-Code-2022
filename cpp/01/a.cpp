#include <iostream>
// #include <vector>
#include <fstream>
#include <string>

using namespace std;

int main()
{
  cout << "Hello world" << endl;

  fstream file("example.txt");

  int max = 0;
  int curr = 0;

  string line;
  while (getline(file, line))
  {
    if (line == "")
    {
      cout << "Aint none" << endl;
    }
    else
    {
      cout << line << endl;
    }
  }

  file.close();

  return 0;
}