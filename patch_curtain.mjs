import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target1 = `            onDragEnd={(e, info) => {
              setIsDraggingLeft(false);
              handleDragEndLeft();
            }}
            onClick={() => {
              if (!leftHooked) {
                setLeftHooked(true);
                animate(xLeft, -maxDrag, { type: "tween", ease: "easeOut", duration: 0.4 });
              }
            }}
          />`;

const replacement1 = `            onDragEnd={(e, info) => {
              setIsDraggingLeft(false);
              handleDragEndLeft();
            }}
          />`;

const target2 = `            onDragEnd={(e, info) => {
              setIsDraggingRight(false);
              handleDragEndRight();
            }}
            onClick={() => {
              if (!rightHooked) {
                setRightHooked(true);
                animate(xRight, maxDrag, { type: "tween", ease: "easeOut", duration: 0.4 });
              }
            }}
          />`;

const replacement2 = `            onDragEnd={(e, info) => {
              setIsDraggingRight(false);
              handleDragEndRight();
            }}
          />`;

if (content.includes(target1) && content.includes(target2)) {
  content = content.replace(target1, replacement1);
  content = content.replace(target2, replacement2);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Successfully removed click handlers.");
} else {
  console.log("Could not find targets.");
}
