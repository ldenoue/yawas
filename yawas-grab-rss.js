function getAnnotations() {
  //console.log('getAnnotation',document.readyState);
  let sigElement = document.body.querySelector('signature');
  let signature = null;
  if (sigElement)
    signature = sigElement.textContent;
  let r = [];
  document.body.querySelectorAll('bkmk_annotation').forEach(a => r.push(a.textContent));
  let labels = [];
  document.body.querySelectorAll('bkmk_label').forEach(a => labels.push(a.textContent));
  let obj = {signature:signature,annotation:r.join(''),labels:labels.join(',')};
  //console.log('getAnnotations returns',obj);
  return obj;
}
getAnnotations();