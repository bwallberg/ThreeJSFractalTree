const DEGREES_TO_RADIANS = Math.PI/180;
const ANGLE_MODIFIER = 20;


function getRandomHeight(height) {
  return height - (1 + (Math.random() * 2));
}

function getRandomAngle(startAngle, direction) {
  return startAngle + direction * (ANGLE_MODIFIER + (Math.random() * 5));
}

function getNewY(root, height) {
  return root.position.y + (root.size.height / 2 + height / 2)
}

class Branch {
  constructor(position, size, angle) {
    this.position = position;
    this.size = size;
    this.angle = angle;

    this.isSplit = false;
  }

  split() {
    this.isSplit = true;
  }
}

function createBranch(root, direction) {
  const height = getRandomHeight(root.size.height);
  const angle = getRandomAngle(root.angle, direction);

  const distance = root.size.height / 2 + height / 2;

  return new Branch(
    {
      y: root.position.y + distance * Math.sin(angle * DEGREES_TO_RADIANS),
      x: root.position.x + -distance * Math.cos(angle * DEGREES_TO_RADIANS),
      z: root.position.z
    },
    {
      width: root.size.width,
      depth: root.size.depth,
      height: height
    },
    angle
  );
}

export default class FractalTree {
  constructor(trunkPosition, trunkSize) {
    this.branches = [];
    this.grown = false;

    this.branches.push(new Branch(
      trunkPosition,
      trunkSize,
      90
    ));
  }

  getBranches() {
    return this.branches;
  }

  grow() {
    let newBranches = [];
    if (!this.grown) {
      this.branches.forEach((branch) => {
        if(!branch.isSplit) {
          branch.split();
          const branchOne = createBranch(branch, -1);
          const branchTwo = createBranch(branch, 1);

          if(branchOne.size.height > 0) {
            newBranches.push(branchOne);
          }
          if(branchTwo.size.height > 0) {
            newBranches.push(branchTwo);
          }
        }
      });
      if(newBranches.length > 0) {
        this.branches = this.branches.concat(newBranches);
      } else {
        this.grown = true;
      }
    }
    return newBranches;
  }
}