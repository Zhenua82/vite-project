let massive: number[] = [2, 4, 65, 1, 3, 87, 10];
let a = 3
massive = [3, 1, 34, 25, 78]
const Iterator: React.FC = () => {
    const maping = massive.map(el =>  el * 10);
    const each = massive.forEach(el => {a = el*a; console.log(a)});
    const filter = massive.filter(el => el < 5);
    const find34 = massive.find(el => el === 34)
    const index34 = massive.findIndex(el => el === 34);
    return (
    <>
        <h2> Iterators:</h2>
        Massive: {massive.join(', ')}
        <br></br>
        Map: {maping.join(', ')}
        <br></br> 
        Each: {each} (undefined)
        <br></br>
        Filter: {filter.join(', ')}
        <br></br>
        Find34: {find34}
        <br></br>
        Index34: {index34}
        <br></br>
        Massive: {massive.join(', ')}
    </>)
}
export default Iterator