import traverse from "traverse";
import firebase from "firebase";

export const serialize = (data) => {
  return traverse.map(data, function (node) {
    if (node?.constructor?.name === "Timestamp") {
      this.update(node.toDate());
    }
  });
};
