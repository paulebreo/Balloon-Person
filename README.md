# Balloon Person
### Overview

### Technologies Used
* Vanilla Javascript
* Jasmine unit tests
* CSS Grid
* CSS Flex

# Developer setup

## Useful VSC extensions
* LiveReload for VSC
* ESLint
* Bracket Pair Colorizer

## Node commands
```
npm install
# in one terminal
npm test
# in a different terminal
npm run sass
```

# How it works

## Program flow / logic

## UI

## Known issues
* Not responsive


Resources
----

http://youmightnotneedjquery.com/



append child
```
parent.appendChild(el);
```

find children
```
el.querySelectorAll(selector);

```

find eleements
```
document.querySelectorAll('.my #awesome selector');
```

toggle class
```

$(el).toggleClass(className)

if (el.classList) {
  el.classList.toggle(className);
} else {
  var classes = el.className.split(' ');
  var existingIndex = classes.indexOf(className);

  if (existingIndex >= 0)
    classes.splice(existingIndex, 1);
  else
    classes.push(className);

  el.className = classes.join(' ');
}
```