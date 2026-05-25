import { NextResponse } from 'next/server';
import { runSafetyChecks } from '@/lib/safety-engine';
import { Patient } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { newDrugName, patient } = await req.json() as { newDrugName: string, patient: Patient };
    if (!newDrugName || !patient) {
      return NextResponse.json({ error: 'Missing newDrugName or patient' }, { status: 400 });
    }

    const result = await runSafetyChecks(newDrugName, patient);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Safety Check Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
