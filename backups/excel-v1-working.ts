
import * as XLSX from "xlsx";

export interface Question {
    question: string;
    choices: string[];
    answer: string;
    category: string;
}

export async function loadQuestions(): Promise<Question[]> {
    const response = await fetch("/Engineer Christian Review Master.xlsx");

    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json<any>(sheet);

    return rows.map((row) => ({
        question: row.Question,
        choices: [
            row["Choice A"],
            row["Choice B"],
            row["Choice C"],
            row["Choice D"],
            row["Choice E"],
        ],
        answer: row["Correct Answer"],
        category: row.Category,
    }));
}
