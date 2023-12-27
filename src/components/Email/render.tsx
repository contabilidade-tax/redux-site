'use server'

import { render } from '@react-email/render';
import Email from '@/components/Email';


export async function renderizar(data: any) {
  const htmlContent = render(<Email {...data} />);
  return htmlContent
}
