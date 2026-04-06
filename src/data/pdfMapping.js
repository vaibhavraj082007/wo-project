// Maps (class, subject) → PDF folder path and file naming pattern
// PDFs are served from public/ folder and accessible at the root URL
//
// Correct mapping based on user's folder structure in public/:
//   6th: maths(fegp1,10), science(fecu1,12), english(fepr1,5), social science(fees1,14), hindi(fhml1,13)
//   7th: maths(gegp1,8), scince(gecu1,12), english (gepr1,5), social science part-1(gees1,12), social scince part-2(gees2,8)
//   8th: maths(hegp2,7), english (hepr1,5), social scince part -1 (hees1,7)

const pdfMapping = {
  6: {
    math:  { folder: '6th/maths',           prefix: 'fegp1', count: 10 },
    sci:   { folder: '6th/science',          prefix: 'fecu1', count: 12 },
    eng:   { folder: '6th/english',          prefix: 'fepr1', count: 5 },
    sst:   { folder: '6th/social science',   prefix: 'fees1', count: 14 },
    hindi: { folder: '6th/hindi',            prefix: 'fhml1', count: 13 },
  },
  7: {
    math:  { folder: '7th/maths',                    prefix: 'gegp1', count: 8 },
    sci:   { folder: '7th/scince',                   prefix: 'gecu1', count: 12 },
    eng:   { folder: '7th/english ',                  prefix: 'gepr1', count: 5 },
    sst:   { folder: '7th/social science part-1',    prefix: 'gees1', count: 12 },
    hindi: { folder: '7th/social scince part-2',     prefix: 'gees2', count: 8 },
  },
  8: {
    math:  { folder: '8th/maths',                       prefix: 'hegp2', count: 7 },
    eng:   { folder: '8th/english ',                     prefix: 'hepr1', count: 5 },
    sst:   { folder: '8th/social scince part -1 ',      prefix: 'hees1', count: 7 },
  },
};

/**
 * Get the PDF URL for a given class, subject, and chapter number.
 * Returns null if no PDF is available.
 */
export function getPdfUrl(classNum, subjectId, chapterNum) {
  const classMap = pdfMapping[classNum];
  if (!classMap) return null;

  const subjectMap = classMap[subjectId];
  if (!subjectMap) return null;

  if (chapterNum < 1 || chapterNum > subjectMap.count) return null;

  const paddedNum = chapterNum.toString().padStart(2, '0');
  return `/${encodeURI(subjectMap.folder)}/${subjectMap.prefix}${paddedNum}.pdf`;
}

/**
 * Get total number of available PDF chapters for a class + subject.
 */
export function getPdfChapterCount(classNum, subjectId) {
  const classMap = pdfMapping[classNum];
  if (!classMap) return 0;
  const subjectMap = classMap[subjectId];
  return subjectMap ? subjectMap.count : 0;
}

export default pdfMapping;
