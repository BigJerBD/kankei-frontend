function makeTitle(dataObject) {
  return Object.keys(dataObject)
    .reduce(
      // eslint-disable-next-line no-unused-vars
      (prev, key, num, _) => `${prev}<strong>${key}:</strong> ${dataObject[key]}<br> \n`,
      '',
    );
}

export function appendDataToTitle(elem, dataField, titleField) {
  const result = elem;
  const title = makeTitle(elem[dataField]);
  if (title) {
    result[titleField] = title;
  }
  return result;
}

export function forwardLabel(elem, mapping, multipleType, labelField, typeField, dataField) {
  const result = elem;
  const typedata = result[typeField] || null;
  let key;
  if (multipleType) {
    key = typedata ? mapping.find((dt) => typedata.includes(dt[0])) : null;
  } else {
    key = typedata ? mapping.find((dt) => typedata === dt[0]) : null;
  }
  if (key && key[1] === '__self__') {
    // note :: __self__ on multipleType will break
    result[labelField] = typedata;
  } else {
    const labelVal = key ? result[dataField][key[1]] || null : null;
    if (labelVal) {
      result[labelField] = labelVal;
    }
  }

  return result;
}


// todo make frowarding with find, because its cool :)
export function forwardNodeGroup(elem, groups) {
  const result = elem;
  result.group = 'none';
  Object.keys(groups)
    .forEach((i) => {
      const group = groups[i];
      if (result.labels.includes(group)) {
        result.group = group;
        return null;
      }
      return null;
    });

  return result;
}

export function forwardLinkGroup(elem, groups) {
  const res = elem;
  res.group = 'none';
  Object.keys(groups)
    .forEach((id) => {
      const group = groups[id];
      if (elem.type === id) {
        res.group = group;
        return null;
      }
      return null;
    });
  return res;
}
